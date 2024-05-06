mod core;
mod environ;
mod frontend;
mod runtime;

use core::frontend::Lexer;
use core::runtime::Output;
use core::Program;

use std::time::Duration;
use std::sync::mpsc;
use std::thread;
use http::Method;
use tower_http::cors::{
    CorsLayer,
    Any
};
use axum::{
    routing::{get, post},
    Router,
    serve,
    Json
};
use tokio::net::TcpListener;
use serde::Deserialize;


#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_origin(Any);
    
    let app = Router::new()
        .route("/", get(root))
        .route("/felys/exec", post(exec))
        .layer(cors);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    serve(listener, app).await.unwrap();
}


async fn root() -> &'static str {
    "FelysNeko API"
}


async fn exec(
    Json(payload): Json<FelysCode>
) -> String {
    let (sender, receiver) = mpsc::channel();
    thread::spawn(move || sender.send(run(payload.input)));
    match receiver.recv_timeout(Duration::from_secs(1)) {
        Ok(result) => result,
        Err(_) => "TimeoutError: exceeded 1 second runtime limitation".to_string()
    }
}


fn run(input: String) -> String {
    let main: Program = match Lexer::parse(input) {
        Ok(p) => p,
        Err(e) => return format!("SyntaxError: {}", e.render())
    };

    let out: Output = match main.run() {
        Ok(r) => r,
        Err(e) => return format!("RuntimeError: {}", e.render())
    };

    out.render()
}


#[derive(Deserialize)]
struct FelysCode {
    input: String,
}

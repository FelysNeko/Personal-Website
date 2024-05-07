mod core;
mod environ;
mod frontend;
mod runtime;

use core::frontend::Lexer;
use core::runtime::Output;
use core::Program;

use http::Method;
use http::header;
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
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([header::CONTENT_TYPE])
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
    let main: Program = match Lexer::parse(payload.input) {
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

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
    let cors: CorsLayer = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_headers(Any)
        .allow_origin(Any);

    let app: Router = Router::new()
        .route("/", get(root))
        .route("/exec", post(exec))
        .layer(cors);

    let listener: TcpListener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    serve(listener, app).await.unwrap();
}


async fn root() -> &'static str {
    return "felys-interpreter root endpoint"
}


async fn exec(
    Json(payload): Json<FelysCode>
) -> String {
    felys::exec(payload.input)
}


#[derive(Deserialize)]
struct FelysCode {
    input: String,
}

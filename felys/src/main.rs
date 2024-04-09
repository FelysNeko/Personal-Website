mod frontend;
mod runtime;
mod error;

use frontend::Node;
use frontend::Lexer;
use runtime::Value;
use runtime::Scope;
use crate::error::Handler::{Good, Bad};

use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Serialize, Deserialize};


#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/run", post(run));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}


async fn root() -> &'static str {
    "FelysNeko API Root Path"
}


async fn run(
    Json(payload): Json<Code>,
) -> (StatusCode, Json<Result>) {
    let mut env: Scope = Scope::new();
    let mut result: String = String::new();

    for expr in payload.code {
        let entry: Node = match Lexer::parse(expr.trim().to_string()) {
            Good(n) => n,
            Bad(b) => {
                let result = Result {
                    result: b,
                };
                return (StatusCode::BAD_REQUEST, Json(result));
            }
        };

        let value: Value = match entry.eval(&mut env) {
            Good(n) => n,
            Bad(b) => {
                let result = Result {
                    result: b,
                };
                return (StatusCode::BAD_REQUEST, Json(result));
            }
        };

        result = value.value;
    }

    let msg = Result { result };
    (StatusCode::OK, Json(msg))
}


#[derive(Deserialize)]
struct Code {
    code: Vec<String>,
}

#[derive(Serialize)]
struct Result {
    result: String
}

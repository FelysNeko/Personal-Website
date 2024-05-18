FROM rust:alpine AS builder

RUN apk add libc-dev

COPY . /app/

WORKDIR /app/service/

RUN ["cargo", "build", "--release"]


FROM alpine:latest

COPY --from=builder /app/service/target/release/service /

EXPOSE 3000

CMD ["./service"]

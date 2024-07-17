import uvicorn

from server.log.log import LOGGING_CONFIG

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8080, reload=False, log_config=LOGGING_CONFIG)

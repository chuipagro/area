FROM ubuntu:latest
LABEL authors="pablolevy"

ENTRYPOINT ["top", "-b"]
FROM node AS build

LABEL org.opencontainers.image.description "Dockstat is an OpenSource Docker statistics webservice. It relies on the dockstatapi"
LABEL org.opencontainers.image.source=https://github.com/its4nik/dockstat
LABEL org.opencontainers.image.licenses=MPL-2.0


WORKDIR /build

# Set environment variables for build time
ARG REACT_APP_API_URL
ARG REACT_APP_DEFAULT_THEME
ARG REACT_APP_SECRET

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_DEFAULT_THEME=${REACT_APP_DEFAULT_THEME}
ENV REACT_APP_SECRET=${REACT_APP_SECRET}

COPY . /build

# Install dependencies and build the React app
RUN npm install --force && \
    npm run build && \
    chmod +x /build/entrypoint.sh

# Final stage
FROM node:slim

WORKDIR /app

# Copy build artifacts and entrypoint script from the build stage
COPY --from=build /build/build /app/build
COPY --from=build /build/entrypoint.sh /app

RUN npm install -g serve

EXPOSE 3000

# Run the entrypoint script
ENTRYPOINT [ "bash", "/app/entrypoint.sh" ]

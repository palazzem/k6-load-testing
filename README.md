# Load Testing Tool

Load testing tool built with [k6](https://k6.io/) and [Datadog](https://www.datadoghq.com/).

## Requirements

- [Docker or Docker Desktop](https://www.docker.com/)
- `docker-compose`, usually installed through Docker or Docker Desktop

## Components

This tool provides two main components:
1. A Datadog Agent that collects statsd metrics sent by a k6 container.
2. A k6 container with a load testing configuration, in charge of doing the actual load testing.

## Usage

To run this tool you should first configure the Datadog Agent so that it can accept statsd metrics,
then you should configure the k6 testing scenario, and finally run the k6 container.

### Configure the Datadog Agent

Create a `.env.secret` file in this repository folder where you must add your `DD_API_KEY`:

```env
    DD_SITE=<site>
    DD_API_KEY=<key>
```

Replace `site` with `datadoghq.com` for US or `datadoghq.eu` for EU. For more details, check the [Datadog documentation](https://docs.datadoghq.com/getting_started/site/).

Replace `<key>` with your Datadog API key you can find in [Datadog Settings](https://app.datadoghq.eu/organization-settings/api-keys).
If you don't have any, create a new one and include the value as described above.

Once the Datadog Agent is configured, you can run it via `docker-compose`:

```bash
    $ docker-compose up -d --env-file .env.secrets
```

### Configure k6 Testing Scenario

All the configuration is available in `scripts/load-test.js` in the `options` variable. Once you have updated the configuration
and the Datadog Agent is already running, launch your test scenario:

```bash
docker run --rm --network k6-load-testing \
           --env-file .env \
       local/k6:latest \
       run --out statsd /scripts/load-test.js
```

## Check Results

You can find your results in your Datadog dashboard.

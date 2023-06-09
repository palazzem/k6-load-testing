# Load Testing Tool

Load testing tool built with [k6](https://k6.io/) and [Datadog](https://www.datadoghq.com/).

## Requirements

- [Docker or Docker Desktop](https://www.docker.com/)
- `docker-compose`, which is usually installed through Docker or Docker Desktop

## Components

This tool provides two main components:
1. A Datadog Agent that collects StatsD metrics sent by a k6 container.
2. A k6 container with a load testing configuration that is responsible for performing the load testing.

## Usage

To use this tool, you will need to configure the Datadog Agent to accept statsd metrics, configure the k6
testing scenario, and then run the k6 container.

### Configure the Datadog Agent

Create a `.env` file with the following content:

```env
    DD_SITE=<site>
    DD_API_KEY=<key>
```

Replace `site` with `datadoghq.com` for US or `datadoghq.eu` for EU. For more details, check the [Datadog documentation](https://docs.datadoghq.com/getting_started/site/).

Replace `<key>` with your Datadog API key you can find in [Datadog Settings](https://app.datadoghq.eu/organization-settings/api-keys).
If you don't have any, create a new one and include the value as described above.

Once the Datadog Agent is configured, you can run it via `docker-compose`:

```bash
    $ docker-compose up -d
```

Once you finish your testing, remember to shutdown the Datadog Agent with the following command:

```bash
    $ docker-compose down
```

### Configure k6 Testing Scenario

All the configuration is available in `scripts/load-test.js` in the `options` variable. Once you have updated the configuration
and the Datadog Agent is already running, build your testing container that will include a static configuration.

```bash
    $ docker build -t local/k6:latest .
```

Remember you should build the container everytime you change the configuration.

Once the container is ready, launch your test scenario:

```bash
    $ docker run --rm --network k6-load-testing \
                 --env K6_STATSD_ADDR=datadog-agent:8125 \
                 --env K6_STATSD_ENABLE_TAGS=true \
             local/k6:latest \
             run --out statsd /scripts/load-test.js
```

## Check Results

You can find your results in your Datadog dashboard.

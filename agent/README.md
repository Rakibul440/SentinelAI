# SentinelAI Agent

SentinelAI Agent is a lightweight Linux security telemetry collector. It runs on a monitored Linux system, collects security-related logs, and prepares them for processing by the SentinelAI Server.

The Agent is intentionally kept lightweight. Detection, machine learning, attack correlation, and investigation are handled by the Server.

## Architecture

```text
Linux System
     │
     ↓
SentinelAI Agent
     │
     ├── Collect Logs
     ├── Parse Logs
     ├── Normalize Events
     ├── Buffer Events
     └── Send Events
             │
             ↓
      SentinelAI Server
```

## Project Structure

```text
agent/
├── collectors/
│   ├── __init__.py
│   └── linux.py
│
├── config/
│   ├── __init__.py
│   ├── config.yaml
│   └── loader.py
│
├── main.py
├── requirements.txt
└── README.md
```

### Components

| Component             | Responsibility                           |
| --------------------- | ---------------------------------------- |
| `main.py`             | Main entry point and agent orchestration |
| `collectors/`         | Collect raw system logs                  |
| `collectors/linux.py` | Linux log collection                     |
| `config/config.yaml`  | Agent configuration and log paths        |
| `config/loader.py`    | Loads configuration                      |
| `requirements.txt`    | Python dependencies                      |

## Requirements

* Linux system
* Python 3.10+
* Git

Check Python:

```bash
python3 --version
```

## Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
cd SentinelAI/agent
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

Edit:

```text
config/config.yaml
```

Example:

```yaml
logs:
  auth: /var/log/auth.log
```

The configured log path depends on the Linux distribution.

For example, Ubuntu/Debian systems commonly use:

```text
/var/log/auth.log
```

Verify the file exists:

```bash
ls -l /var/log/auth.log
```

## Running the Agent

During the current development stage, the Linux collector can be tested with:

```bash
python3 -m collectors.linux
```

The final agent will be started through:

```bash
python3 main.py
```

## Development Roadmap

The Agent will gradually implement:

```text
1. Linux Log Collection
        ↓
2. Live Log Monitoring
        ↓
3. Log Parsing
        ↓
4. Event Normalization
        ↓
5. Local Buffering
        ↓
6. Secure Server Communication
```

### Agent Responsibility

The Agent should remain focused on:

> **Collect → Parse → Normalize → Buffer → Send**

The following should **not** be implemented inside the Agent:

* AI/ML models
* Attack correlation
* Incident investigation
* Heavy analytics
* Rule engine
* Security dashboard

These responsibilities belong to the SentinelAI Server.

## Development Guidelines

Keep the Agent modular. Avoid putting all logic into `main.py`.

Use:

```text
collectors/  → data collection
parsers/     → log parsing
core/        → shared agent logic
transport/   → server communication
config/      → configuration
```

Do not commit:

```text
venv/
.env
__pycache__/
*.pyc
```

## Current Development Status

**Current milestone:**

> Successfully access and read the configured Linux authentication log.

The next milestone is **continuous live log monitoring**.

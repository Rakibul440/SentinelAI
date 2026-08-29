# 🛡️ SentinelAI

### AI-Assisted Cyber Defense & Security Investigation Platform

> **SentinelAI is a lightweight security investigation platform that collects Linux server telemetry, detects suspicious activity, correlates related events, and reconstructs attacks into understandable incidents and attack chains.**

---

## 📌 Overview

Modern systems generate thousands of security events every day from authentication logs, web servers, applications, processes, and network activity.

The problem is not simply **detecting one suspicious event**.

The bigger challenge is understanding:

> **"Are these events independent, or are they different steps of the same attack?"**

SentinelAI focuses on this problem.

It collects security-related events from Linux servers using a lightweight agent, normalizes them into a common format, detects suspicious behavior using rules and machine learning, correlates related events, and builds an understandable representation of the attack.

For example:

```text
Failed SSH Login
       ↓
Successful Login
       ↓
Privilege Escalation
       ↓
Suspicious Command
       ↓
File Modification
       ↓
Outbound Connection
```

Instead of presenting these as six unrelated alerts, SentinelAI attempts to recognize them as:

```text
             ONE ATTACK CHAIN
                    ↓
          Possible Account Compromise
                    ↓
          Privilege Escalation
                    ↓
             System Compromise
```

---

# 🎯 Problem Statement

Traditional monitoring systems can generate large numbers of alerts.

However, individual alerts often lack context.

Consider:

```text
10:01  Failed SSH login
10:02  Failed SSH login
10:03  Successful SSH login
10:05  sudo command executed
10:06  suspicious file created
10:08  unusual outbound connection
```

A basic monitoring system may generate multiple separate alerts.

SentinelAI asks:

> **Can these events be connected together to identify a larger attack scenario?**

The project therefore focuses on **event correlation, attack-chain detection, and security investigation**, rather than simply collecting logs.

---

# 💡 Core Idea

SentinelAI follows this pipeline:

```text
Linux Server
     │
     ▼
┌───────────────────┐
│  Sentinel Agent   │
│                   │
│ Collects Logs     │
│ Monitors Events   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Event Normalizer  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Detection Engine  │
│                   │
│ Rule-Based        │
│ +                 │
│ ML Anomaly        │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Event Correlation │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Incident Builder  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Investigation      │
│ & Attack Timeline │
└───────────────────┘
```

---

# 🚀 Main Objectives

SentinelAI aims to:

- Collect security telemetry from Linux systems
- Normalize different log formats
- Detect suspicious activities
- Detect known attack patterns using rules
- Identify relationships between multiple events
- Distinguish isolated attacks from multi-stage attack chains
- Correlate related alerts
- Create security incidents
- Assign risk and confidence scores
- Reconstruct attacks as timelines
- Represent attack relationships as graphs
- Detect unusual behavior using machine learning
- Assist security investigation

---

# 🔥 Key Features

## 1. Lightweight Linux Security Agent

A small agent runs on each monitored Linux server.

The agent is responsible for collecting relevant security information from that particular server.

Possible sources include:

- Linux authentication logs
- SSH activity
- Nginx access/error logs
- Application logs
- System logs
- Security-related events
- Selected process/activity information

The agent does **not** need to understand the complete attack.

Its primary responsibility is:

> **Collect reliable telemetry and send it to SentinelAI.**

---

## 2. Event Collection

Raw system events are collected from different sources.

Example:

```text
SSH:
Failed password for user admin from 192.168.1.20

Nginx:
POST /login HTTP/1.1 401

Application:
User authentication failed

System:
sudo command executed
```

These events originate from different systems and formats.

---

## 3. Event Normalization

Different logs are converted into a common event structure.

Conceptually:

```text
Raw Log
   ↓
Parser
   ↓
Normalized Event
```

Example normalized event:

```text
timestamp
source
event_type
user
source_ip
destination
action
severity
raw_message
```

This allows the detection engine to work with events consistently.

---

# 🧠 Rule-Based Detection Engine

The first version of SentinelAI uses a **rule-based detection engine**.

This is intentionally simple and explainable.

Example:

```text
IF
    multiple failed SSH logins
    occur within a short period

THEN
    detect → Possible Brute Force
```

Another example:

```text
IF
    successful SSH login
    follows repeated failed logins
    from the same source

THEN
    detect → Possible Account Compromise
```

The advantage of rules is that the system can explain:

> **Why was this event considered suspicious?**

---

# 🔗 Single Attack vs Attack Chain

One of the important research goals of SentinelAI is distinguishing between:

### Single Attack

An isolated malicious activity.

Example:

```text
Repeated SSH Login Failures
```

The system may create:

```text
Incident:
SSH Brute Force

Severity:
Medium

Confidence:
High
```

---

### Mixed / Chain Attack

Multiple different attack stages occur together.

Example:

```text
Brute Force
     ↓
Successful Login
     ↓
Privilege Escalation
     ↓
Suspicious Command
     ↓
File Modification
```

Instead of creating five unrelated incidents, SentinelAI attempts to correlate them:

```text
             Attack Chain
                  │
      ┌───────────┼───────────┐
      ↓           ↓           ↓
 Brute Force   Login      Privilege
                            Escalation
                                │
                                ↓
                         Suspicious Command
                                │
                                ↓
                         File Modification
```

This provides **context**, rather than only individual alerts.

---

# 🔍 Event Correlation

Correlation is the core component that connects related security events.

Events may be correlated using factors such as:

- Source IP
- Destination
- User
- Host
- Process
- Event type
- Time window
- Attack stage
- Related entities

Conceptually:

```text
Event A
   │
   ├── Same Host
   ├── Same User
   ├── Related IP
   ├── Close Timestamp
   └── Related Attack Stage
          │
          ▼
      Event B
          │
          ▼
      Event C
```

The objective is to determine whether events belong to:

```text
Independent incidents
```

or:

```text
One coordinated attack
```

---

# 🚨 Incident Creation

When related suspicious events are correlated, SentinelAI can create an incident.

Example:

```text
INCIDENT #001

Title:
Possible SSH Account Compromise

Host:
web-server-01

Attack Stages:
1. Brute Force
2. Successful Authentication
3. Privilege Escalation
4. Suspicious Command

Risk:
High

Confidence:
0.91
```

---

# 📊 Risk & Confidence Scoring

SentinelAI separates two important concepts:

### Risk

How dangerous the detected activity could be.

Example:

```text
Low
Medium
High
Critical
```

### Confidence

How strongly the available evidence supports the detection.

Example:

```text
Confidence: 0.91
```

This helps avoid treating every suspicious event as equally dangerous.

---

# 🤖 Machine Learning Layer

After the initial rule-based system, SentinelAI introduces machine learning for anomaly detection.

The planned approach uses:

### Isolation Forest

Isolation Forest can identify events or behavior that are unusual compared with normal system activity.

Conceptually:

```text
Normal Behavior
       │
       │
       ├── Login
       ├── Normal Request
       ├── Normal Process
       └── Normal Activity
       
       ↓

      ML Model

       ↓

Unusual Behavior
```

The ML layer complements rules.

It is **not intended to replace deterministic security rules**.

The architecture therefore becomes:

```text
             Events
                │
        ┌───────┴───────┐
        ↓               ↓
   Rule Engine      ML Detector
        │               │
        └───────┬───────┘
                ↓
          Correlation
                ↓
            Incident
```

---

# 🕒 Attack Timeline

Once events are correlated, SentinelAI can reconstruct the sequence of activity.

Example:

```text
10:01:03  ── Failed SSH Login
10:01:08  ── Failed SSH Login
10:01:15  ── Failed SSH Login
10:02:01  ── Successful SSH Login
10:03:12  ── sudo command
10:04:22  ── Suspicious file created
10:05:41  ── Outbound connection
```

This provides investigators with a chronological view of the incident.

---

# 🕸️ Attack Graph

The same incident can be represented as relationships:

```text
        Source IP
            │
            ▼
      SSH Brute Force
            │
            ▼
    Successful Login
            │
            ▼
   Privilege Escalation
            │
            ▼
     Suspicious Command
            │
            ▼
      File Modification
            │
            ▼
     Outbound Connection
```

This helps investigators understand:

> **What happened → what happened next → what it affected.**

---

# 🏗️ System Architecture

```text
                     ┌─────────────────────┐
                     │      Linux Server   │
                     │                     │
                     │  SSH / Nginx / App  │
                     │  System Logs        │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   Sentinel Agent    │
                     │                     │
                     │  Collection         │
                     │  Parsing            │
                     │  Local Filtering    │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Event Ingestion     │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Event Normalization │
                     └──────────┬──────────┘
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
              ┌──────────────┐      ┌──────────────┐
              │ Rule Engine  │      │ ML Detector  │
              └──────┬───────┘      └──────┬───────┘
                     │                     │
                     └──────────┬──────────┘
                                ▼
                     ┌─────────────────────┐
                     │ Event Correlation   │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Incident Builder    │
                     └──────────┬──────────┘
                                │
                  ┌─────────────┼─────────────┐
                  ▼             ▼             ▼
             Risk Score    Timeline       Graph
```

---

# 🧩 Major Components

## Sentinel Agent

Runs on monitored Linux servers.

Responsibilities:

- Monitor configured log sources
- Collect events
- Parse relevant information
- Normalize or prepare telemetry
- Forward events to the central platform

---

## Event Ingestion Layer

Responsible for receiving events from agents.

Responsibilities:

- Accept incoming telemetry
- Validate events
- Manage ingestion
- Pass events to processing components

---

## Normalization Layer

Converts different event formats into a unified representation.

---

## Detection Engine

Contains the detection logic.

Initially:

```text
Rule-Based Detection
```

Later:

```text
Rule-Based Detection
        +
ML Anomaly Detection
```

---

## Correlation Engine

Connects related events.

Its main purpose is to answer:

```text
Do these alerts belong together?
```

---

## Incident Engine

Converts correlated suspicious activity into an incident.

It provides:

- Incident title
- Affected host
- Attack stages
- Severity
- Risk
- Confidence
- Related events

---

## Investigation Layer

Provides:

- Event timeline
- Attack chain
- Relationships between events
- Evidence
- Investigation context

---

# 🛠️ Technology Stack

The exact implementation stack may evolve during development, but the project is designed around the following categories:

### Operating System

- Linux
- Ubuntu

### Agent

- Linux-compatible lightweight service
- Log monitoring
- Event parsing

### Backend

- Python-based security processing components

### Detection

- Rule-based detection engine
- Pattern matching
- Event correlation

### Machine Learning

- Python
- Scikit-learn
- Isolation Forest

### Data

- Structured security events
- JSON-based event representation

### Storage

- Event and incident storage appropriate for the MVP

### Investigation

- Timeline representation
- Attack graph / relationship representation

---

# 📁 Proposed Project Structure

```text
SentinelAI/
│
├── agent/
│   ├── collectors/
│   ├── parsers/
│   ├── normalizer/
│   └── agent.py
│
├── detection/
│   ├── rules/
│   ├── rule_engine/
│   └── detectors/
│
├── correlation/
│   ├── event_correlator/
│   └── attack_chain/
│
├── ml/
│   ├── anomaly_detection/
│   └── models/
│
├── incidents/
│   ├── incident_builder/
│   └── scoring/
│
├── investigation/
│   ├── timeline/
│   └── attack_graph/
│
├── storage/
│
├── tests/
│
├── docs/
│
├── examples/
│
└── README.md
```

> The structure is a proposed organization and may change as implementation progresses.

---

# 🔄 End-to-End Example

Suppose an attacker attempts to compromise a Linux server.

### Step 1 — Reconnaissance / Initial Activity

The server begins receiving unusual requests.

```text
Web Request
     ↓
Application Log
```

---

### Step 2 — Authentication Attack

The attacker attempts multiple SSH logins.

```text
Failed Login
Failed Login
Failed Login
Failed Login
```

Rule engine:

```text
Possible Brute Force
```

---

### Step 3 — Successful Login

Eventually:

```text
Successful SSH Login
```

The correlation engine notices:

```text
Brute Force
     +
Successful Login
```

This is more suspicious than either event individually.

---

### Step 4 — Privilege Escalation

The account executes suspicious privileged commands.

```text
sudo
```

Now the chain becomes:

```text
Brute Force
     ↓
Successful Login
     ↓
Privilege Escalation
```

---

### Step 5 — Post-Compromise Activity

A suspicious file is created.

```text
File Modification
```

The incident becomes:

```text
Brute Force
      ↓
Account Compromise
      ↓
Privilege Escalation
      ↓
Post-Compromise Activity
```

SentinelAI can represent this as **one correlated attack chain** instead of several unrelated alerts.

---

# 🧪 Initial MVP

The first working milestone focuses on proving the fundamental idea.

### MVP Goal

```text
Linux Logs
    ↓
Agent
    ↓
Event Collection
    ↓
Normalization
    ↓
Rule Engine
    ↓
Single Attack Detection
    ↓
Multi-Event Correlation
    ↓
Attack Chain
```

The initial implementation intentionally avoids trying to build a complete enterprise security platform.

The goal is to demonstrate that SentinelAI can:

1. Collect real security events
2. Understand their basic meaning
3. Detect suspicious patterns
4. Connect related events
5. Distinguish isolated activity from a chain of attacks

---

# 📌 Current Development Focus

The current development stage focuses primarily on:

### Rule-Based Detection

Examples:

- SSH brute force
- Successful login after repeated failures
- Suspicious privilege escalation
- Suspicious commands
- Abnormal authentication behavior

### Event Correlation

Examples:

```text
Failed Login
      +
Successful Login
      +
Privilege Escalation
```

→ possible attack chain

---

# 🚧 Planned Development

Future development can extend the system with:

- Machine-learning anomaly detection
- Isolation Forest
- More sophisticated event correlation
- Risk scoring
- Confidence scoring
- Attack timelines
- Attack graphs
- Multi-server correlation
- Incident investigation
- Evidence collection
- Selected automated response capabilities
- Security investigation assistance using AI

---

# 🧠 Why SentinelAI?

The project is **not intended to simply become another log monitoring application**.

Its primary focus is:

> **Turning individual security events into understandable attack stories.**

Traditional view:

```text
Alert 1
Alert 2
Alert 3
Alert 4
Alert 5
```

SentinelAI's goal:

```text
             ATTACK
               │
       ┌───────┴───────┐
       ▼               ▼
 Initial Access   Authentication
                       │
                       ▼
                Privilege Escalation
                       │
                       ▼
                 Post-Compromise
```

This makes security events easier to investigate and understand.

---

# 🎓 Academic Value

SentinelAI provides opportunities to study several computer science and cybersecurity concepts:

### Cybersecurity

- Intrusion detection
- Security monitoring
- Attack chains
- Incident investigation
- Security telemetry

### Distributed Systems

- Agent-based architecture
- Distributed event collection
- Communication between servers and central components

### Artificial Intelligence

- Anomaly detection
- Machine learning
- Behavioral analysis

### Data Processing

- Log parsing
- Event normalization
- Event correlation

### Graph Concepts

- Attack relationships
- Event dependency
- Attack-chain visualization

---

# ⚠️ Project Scope

SentinelAI is designed as a **focused academic MVP**, not a replacement for enterprise security platforms.

It does not attempt to become a complete:

- SIEM
- XDR
- EDR
- SOAR
- Enterprise SOC platform

Instead, it focuses on a specific research and engineering problem:

> **How can security telemetry be collected, detected, correlated, and reconstructed into meaningful attack chains?**

Keeping the scope focused makes the system achievable while still providing meaningful cybersecurity research value.

---

# 🔐 Security & Ethical Use

SentinelAI is intended for:

- Authorized systems
- Controlled laboratory environments
- Cybersecurity education
- Security research
- Defensive monitoring

Testing should only be performed on systems for which the user has explicit authorization.

The project should use controlled attack simulations and test environments when evaluating detection capabilities.

---

# 🧪 Testing Strategy

The system can be evaluated using controlled scenarios such as:

### Scenario 1 — Normal Activity

```text
Normal Login
Normal Web Request
Normal Process
```

Expected:

```text
No significant incident
```

---

### Scenario 2 — Single Attack

```text
Repeated SSH Failures
```

Expected:

```text
Brute Force Detection
```

---

### Scenario 3 — Multi-Stage Attack

```text
SSH Brute Force
       ↓
Successful Login
       ↓
Privilege Escalation
       ↓
Suspicious Command
```

Expected:

```text
ONE correlated attack incident
```

---

### Scenario 4 — Unrelated Events

```text
Failed SSH Login
        +
Unrelated Web Error
        +
Normal User Login
```

Expected:

```text
Separate events
```

This is important because the correlation engine should **not connect everything together**.

---

# 📈 Evaluation

The project can eventually be evaluated using metrics such as:

- Detection accuracy
- False positive rate
- False negative rate
- Event correlation accuracy
- Attack-chain reconstruction accuracy
- Detection latency
- Resource consumption of the agent

Actual values should only be reported after experiments are performed.

---

# 🌱 Future Vision

The long-term vision is to evolve SentinelAI into an intelligent security investigation assistant.

Conceptually:

```text
                 SentinelAI
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
   Collection      Detection     Investigation
       │              │              │
       ▼              ▼              ▼
     Events        Alerts         Timeline
       │              │              │
       └──────────────┼──────────────┘
                      ▼
               Attack Correlation
                      │
                      ▼
                Incident Story
                      │
                      ▼
             Security Investigation
```

The ultimate goal is not merely:

> **"Something suspicious happened."**

but:

> **"Here is what happened, how the events are connected, what attack stages were observed, how confident we are, and why the system believes they form one incident."**

---

# 🗺️ Development Roadmap

```text
[✓] Project architecture
       ↓
[✓] Linux telemetry concept
       ↓
[🚧] Sentinel Agent
       ↓
[🚧] Event normalization
       ↓
[🚧] Rule-based detection
       ↓
[🚧] Single attack detection
       ↓
[🚧] Multi-event correlation
       ↓
[ ] Attack-chain detection
       ↓
[ ] Incident generation
       ↓
[ ] Risk & confidence scoring
       ↓
[ ] ML anomaly detection
       ↓
[ ] Attack timeline
       ↓
[ ] Attack graph
       ↓
[ ] Investigation assistance
       ↓
[ ] Selected response capabilities
```

> Status markers should be updated as the implementation progresses.

---

# 🤝 Contribution

Contributions, ideas, and discussions are welcome.

If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate tests
5. Submit a pull request

For major architectural changes, open an issue first to discuss the proposal.

---

# ⚠️ Disclaimer

SentinelAI is an academic cybersecurity research project.

It is designed for authorized defensive security monitoring and controlled research environments.

The developers are not responsible for misuse of the software or unauthorized testing against systems.

---

# 📜 License

License information will be added as the project matures.

---

# ⭐ Project Summary

**SentinelAI** is an AI-assisted cybersecurity investigation platform that transforms raw Linux security telemetry into meaningful security incidents.

Its core idea is simple:

```text
COLLECT
   ↓
UNDERSTAND
   ↓
DETECT
   ↓
CORRELATE
   ↓
RECONSTRUCT
   ↓
INVESTIGATE
```

Rather than treating every security event as an isolated alert, SentinelAI attempts to understand how events relate to each other and reconstruct them into **single attacks or multi-stage attack chains**.

> **SentinelAI — From Security Events to Attack Stories.** 🛡️
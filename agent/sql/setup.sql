CREATE TABLE EVENTS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    timestamp text not null,
    event_type text not null,
    source text,
    source_ip text,
    destination_ip text,
    username text,
    process text,
    port INTEGER,
    message text,
    serverity text,
    raw_log text,
    created_at text default CURRENT_TIMESTAMP
);
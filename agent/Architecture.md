### Algorithm: Live Log Monitoring

Use a file-tail / follow algorithm, similar to tail -f.

1. Open the log file
        ↓
2. Move pointer to the end of existing logs
        ↓
3. Wait for new data
        ↓
4. Read newly appended line(s)
        ↓
5. Send the raw line to main.py
        ↓
6. Repeat
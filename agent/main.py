from collectors.watcher import watch_logs
import time


def main():
    print()
    print("="*55)
    print("              SENTINELAI AGENT")
    print("="*55)
    print("[+] Initializing SentinelAI Agent...")
    time.sleep(0.2)

    try:
        print("[+] Agent started successfully")
        time.sleep(0.2)
        print("[+] Configuring system log paths")
        time.sleep(0.2)
        print("[+] Monitoring system logs")
        time.sleep(0.2)
        print("[+] Watching for security events...")
        time.sleep(0.2)
        print("-"*55)

        watch_logs()

    except KeyboardInterrupt : 
        print("-"*55)
        time.sleep(0.2)
        print("[!] Shutdown signal received")
        time.sleep(0.2)
        print("[+] Stopping log watcher...")
        time.sleep(0.2)
        print("[+] SentinelAI Agent stopped")
        time.sleep(0.2)
        print("="*55)
        print()

if __name__ == "__main__":
    main()
pid_websersocket=$(pgrep -f "websersocket_33dae469-e026-4cbf-bc93-8bb52a1b0d5b.js")
watch -n 1 ps -p $pid_websersocket -o pid,etime,%cpu,%mem,cmd
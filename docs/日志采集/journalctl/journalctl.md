# journalctl

## 使用

```shell
# 帮助文档
journalctl --help
# 查询有哪些容器名称
journalctl -F CONTAINER_NAME
# 查询指定容器的日志
journalctl CONTAINER_NAME=journald_logging
# 查询所有 systemd 单元，这个命令会列出所有在日志中出现过的 _SYSTEMD_UNIT 值，并通过 sort 和 uniq 进行排序和去重。
journalctl -F _SYSTEMD_UNIT | sort | uniq
```

## references

[https://documentation.suse.com/zh-cn/sles/15-SP3/html/SLES-all/cha-journalctl.html](https://documentation.suse.com/zh-cn/sles/15-SP3/html/SLES-all/cha-journalctl.html)

title: Ansible
speaker: Neil Chen

<slide />

# Ansible

Neil Chen

<slide />

## 概述

- Ansible 是当前流行的自动化运维工具，可用来配置系统、部署软件等，默认使用 SSH 协议实现管理节点与远程节点的通信。
- [入门学习资料](https://ansible.leops.cn/basic/Introduction/)，读完 1-15 章（注意：该资料使用的是 ansible 2.9.6，比我们新，其例子中部分 inventory 使用的是 yaml 格式定义的，我们目前使用的是 ini 格式，学习的时候统一使用 ini 格式）。
- [内置模块学习资料](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/index.html#plugins-in-ansible-builtin)，大概了解一下，需要用的时候再详细查看用法。

<slide />

## 安装

我们目前使用的是 Ansible 2.7.6，使用 pip 安装。

```shell
pip install -U ansible==2.7.6
```

<slide />

## Inventory

定义了被管理的主机列表或主机组，默认文件为 /etc/ansible/hosts，可通过 `-i` 选项指定自定义的 inventory 文件。

- 主机、组以及变量的定义。

```ini
# 主机、主机变量
192.168.1.1 ansible_ssh_user=user
# 组
[mongodb-single]
192.168.1.1
# 组变量
[mongodb-single:vars]
mongodbPath=/data/mongodb
# 组嵌套
[databases:children]
mongodb-single
```

<slide />

## Patterns

定位主机和组，即在哪些主机或组中执行命令，格式为 `ansible [-i inventory] <pattern> -m <module_name> -a "<module options>"`，常用的 patterns 如下：

![patterns](./images/ansible_common_patterns.png)

<slide />

## Ad-Hoc

使用 Ansible 命令行工具来执行简单的、一次性的命令，比如：

```shell
# 列出本机 /home 下的目录，需在 inventory test.ini 中定义 host 为 127.0.0.1
ansible -i test.ini 127.0.0.1 -m shell -a "ls -al /home"
# 拷贝 test.ini 到 /tmp 目录
ansible -i test.ini 127.0.0.1 -m copy -a "src=test.ini dest=/tmp"
```

<slide />

## Playbooks

- Playbooks 是 Ansible 指令的集合，使用 YAML 格式，定义了在远程机器上执行命令的策略，命令行工具为 ansible-playbook，非常适用于复杂应用的部署。
- 命令格式为 `ansible-playbook playbooks/<playbook_name> -i inventories/<invnetory_name>`，可使用 `-l` 以限制在指定的 host 上执行，`-t` 只执行指定 tag 相关的 tasks，`-e` 指定额外的变量。

### 基本格式

```yaml
- hosts: '{{ host }}'
  remote_user: root
  vars:
    diskName: 'sdc'
    diskSize: '{{ dataDiskSize }}'
    mountFolder: 'app'
  tasks:
  - name: create docker folder
    file:
      path: /app/docker
      state: directory
  - name: link docker
    file:
      src: /app/docker
      dest: /var/lib/docker
      state: link
  roles:
  - initDisk
```

<slide />

### 常用字段介绍

- hosts 定义了一个或多个主机或组，以冒号分隔。
- remote_user 指定执行该 playbook 的用户的名称。
- vars 定义了 playbook 中需要使用的变量，可直接在 playbook 中配置，也可以从 inventory 的主机或组的变量中获取。
- tasks 定义了 playbook 需要执行的任务列表，每个 tasks 都会执行一个 module（比如 file、apt 等），tasks 按顺序依次执行，其格式如下：

    ```yaml
    - name: tasks name
      {{ MODULE_NAME }}:
          {{ MODULE_PARAMETER }}:
    ```

- roles 主要用于封装 playbook 以方便复用。

<slide />

## Roles & Include 语句

Roles 和 Include 语句结合使用可使　playbook 保持简洁，实现 playbook 的复用。

- 常用的 include 语句：
    - include：引用其他 tasks。
    - include_role：引用其他 role。

- role 基于已知文件结构自动加载某些 vars_files、tasks 的方法，常用目录结构如下：

    ```text
    roles/
      common/
        defaults/
        tasks/
        files/
        templates/
    ```

- role 各目录的内容如下：
    - defaults：role 的默认变量，可在 tasks、templates 中引用，目录中必须包含 main.yml。
    - tasks：role 要执行的主要任务列表，可使用 include 引用其他 task，目录中必须包含 main.yml，
    - files：role 要部署的文件，该目录主要用于存放内容固定不变的系统配置文件、脚本等。
    - templates：role 要部署的模板，可读取 inventory、playbook、role 中设置的变量，遵循 Jinja2 模板语法，通常用来存放要部署的软件的配置文件。

<slide />

## Variables

- 变量名可以为字母、数字以及下划线，并且始终应该以字母开头。
- 变量的使用遵循 Jinja2 模板语法。
- 可在 inventory、playbook、role 中定义变量，也可以在 ansible-playbook 命令行中使用 `-e` 指定变量。
- 可通过 register 关键字注册变量，可在后续的 tasks 中引用该变量。
- 变量的优先级参考[这里](https://ansible.leops.cn/basic/Variables/#_3)。
- Ansible 内置变量参考[这里](https://ansible.leops.cn/basic/Variables/#_7)。

<slide />

## 条件判断与循环

- Ansible 使用 when 语句后的表达式来判断该步骤是否执行。
- Ansible 使用 loop 和 with_*（比如：with_items）实现循环，以简化重复任务的写法。

<slide />

## Thanks

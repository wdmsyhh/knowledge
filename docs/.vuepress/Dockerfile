# 使用Docker+nginx部署Vue打包的dist项目: https://www.cnblogs.com/badaoliumangqizhi/p/15169633.html
FROM nginx
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
RUN echo 'echo nginx with dist init ok!!'
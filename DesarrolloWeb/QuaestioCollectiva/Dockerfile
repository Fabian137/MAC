FROM httpd:2.4
# Copia todo el contenido de tu proyecto
COPY ./ /usr/local/apache2/htdocs/
# Opcional: Configura el ServerName
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
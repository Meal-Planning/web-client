############################################################
# Dockerfile to build MealPlanning web-client
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Chris Duzan

# Install Nginx

# Update the repository
RUN apt-get update

# Download and Install Nginx
RUN apt-get install -y nginx

# Copy build files (this is done in the docker-compose.yml file)
#COPY build/ /usr/share/nginx/html/

# Remove the default Nginx configuration file
RUN ["rm", "-rf", "/etc/nginx/sites-enabled/default"]

# Expose ports
EXPOSE 80

# Copy a configuration file from the current directory
COPY nginx/nginx.conf /etc/nginx/sites-enabled/nginx.conf

# makes sure nginx doesn't spawn it's proccesses and then quit
CMD ["nginx", "-g", "daemon off;"]
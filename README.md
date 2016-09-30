
# city-accelerator-website

### Setup
1. Install [EL-Website](https://github.com/engagementgamelab/EL-Website).
2. Clone this repo (https://github.com/engagementgamelab/city-accelerator-website.git).
3. Link this module to EL-Website: 

  ```
  cd city-accelerator-website
  npm link
  ```
  
  ```
  cd ../EL-Website
  npm link city-accelerator-website
  ```
  
4. Start the module. **From EL-Website**, run:

  ```
  grunt --sites=city-accelerator-website
  ```
The site should now be running at http://localhost:3000.
## Instalation

## Introduction

Custom ads have been tested with wordpress plugin WP Pro ADS and Advanced custom fields. This feature functions in this maner:

- You must create a custom field for each position: Now it is working acf.footer, acf.modal_content, modal_title, modal_time)



## Known issues

### Parameter oauth_consumer_key is missing

The register http request fails with this message: `{error: "401", reason: "Unauthorized", detail: "Parameter oauth_consumer_key is missing"}`

[Solution](https://wordpress.org/support/topic/not-connect-the-android-app-to-wordpress-site-using-register-api)

### Push notifications not working on iOS

Why am I getting the errors `{Unable to connect to tls://gateway.sandbox.push.apple.com:2195}` or `{Unable to connect to tsl://gateway.push.apple.com:2195}`?

[Solution](http://stackoverflow.com/questions/1444355/iphone-push-notification-unable-to-connect-to-the-ssl-server)

### Param tells me that I am not registered

If the "enabled" checkbox on the push notif parameters (in app) is never on. It could mean that the following checkboxes are not checked. Please check at least `category` to resolve the problem.

![image](https://cloud.githubusercontent.com/assets/1388706/19411490/f5f52170-9302-11e6-9f31-28f9a97da691.png)

# Problems

## Time To Live MongoDB

The forgot password functionnality relies on a specific TTL value to be executed. In MongoDB it is possible to specify a an expiration time, but it deletes the entier document and not just an individual field.

To resolve this issue, Redis will be used instead. Redis feels just to be the right tool for the right job. Heroku offers a free tier, it's plenty enough.

=== "Typegoose"

```javascript

@Property({ expires: "30s", default: Date.now() })
changePassword: Date;
```

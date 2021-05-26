# Logging

<hr/>
!!! warning

    For the moment, logging isn't fully implemented in the project,<b>work in progress</b>

<hr/>

## Production & Development Logs

In development, logs are defined in plain text, as for production, they are defined in Json.

=== "Production Logs Example"

    ```log
    {"message":"blaaa","level":"\u001b[31merror\u001b[39m","service":"server-service","timestamp":"2021-04-30T08:39:46.421Z"}
    {"message":"blaaa","level":"\u001b[33mwarn\u001b[39m","service":"server-service","timestamp":"2021-04-30T08:39:46.422Z"}
    ```

=== "Devlopment Logs Example"

    ```log
    2021-04-30 10:30:28 error: blaaa
    2021-04-30 10:30:28 warn: blaaa
    2021-04-30 10:30:28 info: blaaa
    ```

<hr/>

## Log Levels

The Winston logger has different levels of logging, from zero, the most important, to six, the least important.

| Log Type | Log Level |
| :------- | :-------- |
| error    | 0         |
| warn     | 1         |
| info     | 2         |
| http     | 3         |
| verbose  | 4         |
| debug    | 5         |
| silly    | 6         |

<hr/>

## Log Format

Logs should be parsable and scannable, they can be used in a wide range of fields like tracing, analytics or audits.

Using brackets around log values can help to improve readness, it also helps for searching text across regular expression or by using the seed Unix command line utility.

=== "Example"

```log

[2021-05-23 14:25:43] [info]: Order Failed, order id: [pi_1IuIFNGuKRma2QlhhnOTARM5]
```

<hr/>

## Sources

| Source                 |     Author      |                                                                 URI |
| :--------------------- | :-------------: | ------------------------------------------------------------------: |
| Winston Documentation  |     Github      |                        [Link](https://github.com/winstonjs/winston) |
| Logging Best Practices | Dave McAllister | [Link](https://www.scalyr.com/blog/the-10-commandments-of-logging/) |
| Presentation Logging   |  Joseph Reeve   |                                       [Link](https://goo.gl/zqqiht) |

<hr/>

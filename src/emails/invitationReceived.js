let mjml = (byHandle) => `

  <mjml>
    <mj-body>
      <mj-container>
        <mj-section>
          <mj-column>

            <mj-image width="130" padding-bottom="20px" src="http://bouncetribe.com/wp-content/uploads/2016/03/Logo-500.png" />

            <mj-text font-size="24px" font-weight="bold" color="#555555" font-family="helvetica" align="center" line-height="40px" padding-bottom="10px">${byHandle} has invited you to join their tribe! </mj-text>

            <mj-text font-size="16px" color="#777777" font-family="helvetica" align="center" padding-bottom="20px"> Your friend is using BounceTribe to share their music and wants to collaborate with you. </mj-text>

            <mj-button inner-padding="16px 30px" font-size="15px" font-weight="bold" font-family="Helvetica, Arial" align="center" background-color="#9075F3" color="white">
              Accept Invitation
            </mj-button>

            <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />

            <mj-text font-size="13px" color="#999999" font-family="helvetica" align="center" padding-bottom="20px"> Use BounceTribe to share music you're working on and find your musical mentors. </mj-text>

          </mj-column>
        </mj-section>
      </mj-container>
    </mj-body>
  </mjml>
`

export default function invitationReceived(byHandle, urlCode){
  return`
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <title></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      .ReadMsgBody {
        width: 100%;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass * {
        line-height: 100%;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport {
          width: 320px;
        }
        @viewport {
          width: 320px;
        }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <!--[if lte mso 11]>
  <style type="text/css">
    .outlook-group-fix {
      width:100% !important;
    }
  </style>
  <![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100%!important;
        }
      }
    </style>
  </head>

  <body>
    <div class="mj-container">
      <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
      <div style="margin:0px auto;max-width:600px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
          <tbody>
            <tr>
              <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:600px;">
        <![endif]-->
                <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:20px;" align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                            <tbody>
                              <tr>
                                <td style="width:130px;"><img alt="" title="" height="auto" src="http://bouncetribe.com/wp-content/uploads/2016/03/Logo-500.png" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;"
                                    width="130"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:10px;" align="center">
                          <div style="cursor:auto;color:#555555;font-family:helvetica;font-size:24px;font-weight:bold;line-height:40px;text-align:center;">${byHandle} has invited you to join their tribe!</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:20px;" align="center">
                          <div style="cursor:auto;color:#777777;font-family:helvetica;font-size:16px;line-height:22px;text-align:center;">Your friend is using BounceTribe to share their music and wants to collaborate with you.</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;" align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                            <tbody>
                              <tr>
                                <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:16px 30px;" align="center" valign="middle" bgcolor="#9075F3">

                                    <p style="text-decoration:none;background:#9075F3;color:white;font-family:Helvetica, Arial;font-size:15px;font-weight:bold;line-height:120%;text-transform:none;margin:0px;">
                                      <a style="text-decoration:none;" href="https://www.bouncetribe.com${urlCode || ''}">
                                        Accept Invitation
                                      </a>
                                    </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;">
                          <p style="font-size:1px;margin:0px auto;border-top:1px dashed lightgrey;width:100%;"></p>
                          <!--[if mso | IE]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0px auto;border-top:1px dashed lightgrey;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:20px;" align="center">
                          <div style="cursor:auto;color:#999999;font-family:helvetica;font-size:13px;line-height:22px;text-align:center;">Use BounceTribe to share music you're working on and find your musical mentors.</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
        </td></tr></table>
        <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
        </td></tr></table>
        <![endif]-->
    </div>
  </body>

  </html>
  `
}

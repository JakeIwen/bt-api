let mjml = (handle) => `
  <mjml>
    <mj-body>
      <mj-container>
        <mj-section>
          <mj-column>

            <mj-text font-size="30px" font-weight="bold" color="#555555" font-family="helvetica" line-height="40px" padding-bottom="10px">Tribe Request Accepted!</mj-text>

            <mj-text font-size="16px" color="#777777" font-family="helvetica" padding-bottom="20px">${handle} has joined your tribe and wants to hear more of your music.</mj-text>

            <mj-button inner-padding="16px 30px" font-size="15px" font-family="Helvetica, Arial" align="left" background-color="#9075F3" color="white" href="https://test.bouncetribe.com/${handle}">
              View Profile
            </mj-button>

          </mj-column>
        </mj-section>
      </mj-container>
    </mj-body>
  </mjml>
`

export default function friendRequestAccepted(handle){
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
<div>
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
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
    <![endif]-->
            <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:10px;" align="left">
                      <div class="" style="cursor:auto;color:#555555;font-family:helvetica;font-size:30px;font-weight:bold;line-height:40px;text-align:left;">Tribe Request Accepted!</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:20px;" align="left">
                      <div class="" style="cursor:auto;color:#777777;font-family:helvetica;font-size:16px;line-height:22px;text-align:left;">${username} has joined your tribe and wants to hear more of your music.</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;" align="left">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="left" border="0">
                        <tbody>
                          <tr>
                            <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:16px 30px;" align="center" valign="middle" bgcolor="#9075F3"><a href="https://test.bouncetribe.com/${handle}" style="text-decoration:none;line-height:100%;background:#9075F3;color:white;font-family:Helvetica, Arial;font-size:15px;font-weight:normal;text-transform:none;margin:0px;"
                                target="_blank">View Profile</a></td>
                          </tr>
                        </tbody>
                      </table>
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

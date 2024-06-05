// This is a super hacky way of loading HTML to use as dangerouslySetInnerHTML
// The content corresponds to Email.html in the backend
const html = (body: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title>Neighborhood Notification Email</title>
  <!--[if !mso]><!-->
  <!--<![endif]-->
  <style type="text/css">
      body {
          margin: 0;
          padding: 0;
      }
      table,
      td,
      tr {
          vertical-align: top;
          border-collapse: collapse;
      }
      * {
          line-height: inherit;
      }
      .standard-table {
          width: 100%;
          border: 0;
          border-collapse: collapse;
      }
      a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
      }
  </style>
  <style type="text/css" id="media-query">
      @media (max-width: 660px) {
          .block-grid,
          .col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
          }
          .block-grid {
              width: 100% !important;
          }
          .col {
              width: 100% !important;
          }
          .col>div {
              margin: 0 auto;
          }
          .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
          }
          .no-stack.two-up .col {
              width: 50% !important;
          }
      }
  </style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f8f8f9;">
<!--[if IE]>
<div class="ie-browser">
<![endif]-->
<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #f8f8f9; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#f8f8f9" valign="top">
  <tbody>
  <tr style="vertical-align: top;" valign="top">
    <td style="word-break: break-word; vertical-align: top;" valign="top">
      <!--[if (mso)|(IE)]>
      <table style="border-collapse: collapse; border: 0">
        <tr>
          <td style="width=100%; background-color:#f8f8f9; text-align: center; padding: 0">
      <![endif]-->

      <!-- Header -->
      <div style="background-color:transparent;">
        <div class="block-grid " style="margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #1aa19c;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#1aa19c;">
            <!--[if (mso)|(IE)]>
            <table class="standard-table" style="background-color:transparent">
              <tr>
                <td style="padding: 0; text-align: center">
                  <table style="width:640px; border-collapse: collapse; border: 0">
                    <tr class="layout-full-width" style="background-color:#1aa19c">
            <![endif]-->
            <!--[if (mso)|(IE)]>
            <td style="background-color:#1aa19c;width:640px; border: 0 solid transparent; padding: 0; text-align: center; vertical-align: top">
              <table style="width: 100%; border-collapse: collapse; border: 0">
                <tr>
                  <td style="padding: 0">
            <![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
              <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border: 0 solid transparent; padding: 0;">
                  <!--<![endif]-->
                  <div class="img-container center fixedwidth" align="center" style="padding-right: 0;padding-left: 0;">
                    <!--[if mso]>
                    <table class="standard-table">
                      <tr style="line-height:0">
                        <td style="padding: 0; text-align: center">
                    <![endif]--><img class="center fixedwidth" border="0" src="https://d2j3fegnzkmagm.cloudfront.net/email-banner.png" alt="SFTT Email Banner" title="SFTT Email Banner" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 640px; display: block;" width="640">
                    <!--[if mso]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>
        </div>
      </div>

      <!-- Content -->
      <div style="background-color: transparent;">
        <div class="block-grid " style="margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#fff;">
            <!--[if (mso)|(IE)]>
            <table class="standard-table" style="background-color:transparent">
              <tr>
                <td style="padding: 0; text-align: center">
                  <table style="width:640px; border-collapse: collapse; border: 0">
                    <tr class="layout-full-width" style="background-color:#fff">
            <![endif]-->
            <!--[if (mso)|(IE)]>
            <td style="background-color:#fff;width:640px; border-top: 0 solid transparent; padding: 0; text-align: center; vertical-align: top">
              <table style="width: 100%; border-collapse: collapse; border: 0">
                <tr>
                  <td style="padding: 0">
            <![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
              <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border:0 solid transparent; padding: 0">
                  <!--<![endif]-->

                  <!-- Divider -->
                  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 50px 0 0 0" valign="top">
                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border-top: 0 solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!-- Paragraph -->
                  <!--[if mso]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  <!--[if mso]>
                  <table style="width: 100%; border-collapse: collapse; border: 0">
                    <tr>
                      <td style="padding: 10px 30px; font-family: Tahoma, sans-serif">
                  <![endif]-->
                  <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5; padding: 10px 30px">
                    <div style="line-height: 1.5; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 18px;">
                      <p style="font-size: 15px; line-height: 1.5; word-break: break-word; font-family: inherit; mso-line-height-alt: 23px; margin: 0;"><span style="color: #808389; font-size: 15px;">${body}&nbsp;</span></p>
                    </div>
                  </div>

                  <!-- Divider -->
                  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 60px 0 12px" valign="top">
                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border-top: 0 solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color:transparent;">
        <div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
            <!--[if (mso)|(IE)]>
            <table style="background-color:transparent; width: 100%; border-collapse: collapse; border: 0">
              <tr>
                <td style="padding: 0; text-align: center">
                  <table style="width:640px; border-collapse: collapse; border: 0">
                    <tr class="layout-full-width" style="background-color:#ffffff">
            <![endif]-->
            <!--[if (mso)|(IE)]>
            <td style="background-color:#ffffff;width:640px; border-top: 0 solid transparent; padding: 0; text-align: center; vertical-align: top">
              <table style="width: 100%; border-collapse: collapse; border: 0">
                <tr>
                  <td style="padding: 0">
            <![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
              <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border: 0 solid transparent; padding: 0">
                  <!--<![endif]-->

                  <!-- Content-Footer Divider -->
                  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 0" valign="top">
                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border-top: 10px solid #99c356; width: 100%;" align="center" role="presentation" valign="top">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!-- Social Links -->
                  <table class="social_icons" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td style="word-break: break-word; vertical-align: top; padding: 28px 10px 10px;" valign="top">
                        <table class="social_table" align="center" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
                          <tbody>
                          <tr style="vertical-align: top; display: inline-block; text-align: center;" align="center" valign="top">
                            <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px;" valign="top"><a href="https://treeboston.org/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-outline-circle-dark-gray/website@2x.png" alt="Website" title="Website" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;"></a></td>
                            <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px;" valign="top"><a href="https://www.facebook.com/TreesBoston/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-outline-circle-dark-gray/facebook@2x.png" alt="Facebook" title="Facebook" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;"></a></td>
                            <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px;" valign="top"><a href="https://twitter.com/Trees_Boston" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-outline-circle-dark-gray/twitter@2x.png" alt="Twitter" title="Twitter" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;"></a></td>
                            <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px;" valign="top"><a href="https://www.instagram.com/trees_boston/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-outline-circle-dark-gray/instagram@2x.png" alt="Instagram" title="Instagram" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;"></a></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!-- Caption -->
                  <!--[if mso]>
                  <table class="standard-table">
                    <tr>
                      <td style="padding: 15px 45px 10px; font-family: Tahoma, sans-serif">
                  <![endif]-->
                  <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5; padding:15px 45px 10px;">
                    <div style="line-height: 1.5; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 18px;">
                      <p style="font-size: 12px; line-height: 1.5; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 18px; margin: 0;"><span style="font-size: 12px;">We aim&nbsp;to&nbsp;improve&nbsp;the size and health of the urban forest in&nbsp;Boston, with a focus on under-served and under-canopied neighborhoods.</span></p>
                    </div>
                  </div>
                  <!--[if mso]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->

                  <!-- Thin Footer Block -->
                  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 25px 40px 10px;" valign="top">
                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border-top: 1px solid #555961; width: 100%;" align="center" role="presentation" valign="top">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!-- Footer Block -->
                  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                      <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 0;" valign="top">
                        <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border-top: 30px solid #3A681A; width: 100%;" align="center" role="presentation" valign="top">
                          <tbody>
                          <tr style="vertical-align: top;" valign="top">
                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            <!--[if (mso)|(IE)]>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>
        </div>
      </div>
      <!--[if (mso)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
    </td>
  </tr>
  </tbody>
</table>
<!--[if (IE)]>
</div>
<![endif]-->
</body>
</html>`;

export default html;

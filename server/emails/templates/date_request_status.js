module.exports = {
  content: `<div class="container" style="width: 100%; background-color: #f3f3f3; font-family: 'Lato', 'Helvetica', sans-serif; box-sizing: border-box; padding-bottom: 25px; padding-top: 25px;" >
  <div class="panel" style="width: 80%; margin: 0px auto;">
    <div class="panel-heading" style="padding: 25px; margin-top:10px; background-color: #ff6666; border-top-left-radius: 6px; border-top-right-radius: 6px; border: 1px solid #ff6666;">
      <h2 style="text-align: center; color: #ffffff; margin:0px; font-size: 34px;">Date status updated</h2>
    </div>
    <div class="panel-body" style="background-color: #ffffff; padding: 25px; margin-bottom: 25px; color: #303030; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border: 1px solid #dddddd;">
      <p>Hi, your date request to <%= venue %> has been <%= status %>. Please login to view details</p>
      <div style="text-align: center;">
        <a style="background-color: #ff6666; border: none; color: white; padding: 10px 10px;text-decoration: none; display: inline-block; font-size: 12px; margin: 4px 0px; border-radius: 10px;" href="https://www.excuts.com/login">Go to Account</a>
      </div>
      <p>Sincerely,</p>
      <p>The Excuts Team</p>
    </div>
    <div class="panel-footer" style="text-align: center; background-color: #f3f3f3;">
      <p style="color: #787878; font-size: 11px;">Please do not reply to this email. To get in touch with us, visit our <a style="color: #00B7D8;" href="https://www.excuts.com/contact"> help center.</a> <br>If you did not sign up for an Excuts account, please disregard this message.</p>
    </div>
  </div>
</div>`
};
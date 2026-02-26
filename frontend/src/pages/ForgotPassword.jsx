function ForgotPassword() {
  return (
    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <div style={{
        background:"white",
        padding:"40px",
        borderRadius:"10px"
      }}>
        <h2>Reset Password</h2>
        <input placeholder="Enter Email" style={{padding:"10px",width:"250px"}}/>
        <br/><br/>
        <button style={{padding:"10px",background:"#007bff",color:"white"}}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
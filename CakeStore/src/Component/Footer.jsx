import React from 'react'

function Footer() {
    return (
<footer class="bg-dark text-light p-4 text-center text-lg-start container-flex mt-5 " style={{
   
    bottom: "0",
    width: "100%"}}>
    <div class="row">
      <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 >Cakeshop.in</h5>

        <p>
                            Developer<br></br>
                            Contact
        </p>
      </div>
      <div class="col-sm-3 mb-4 mb-md-0 justify-content-end">
        <h5>Social Media</h5>

        <ul class="list-unstyled mb-0">
          <li>
            <a href="#!" class="text-dark"><i className="fa fa-facebook" style={{size:"30px",color:"white"}}></i></a>
          </li>
          <li>
            <a href="#!" class="text-dark"><i className="fa fa-instagram" style={{size:"30px",color:"white"}}></i></a>
          </li>
        </ul>
      </div>

    </div>
    <div className="row m-0">
        <div className="col-sm-12 text-center p-4" style={{backgroundColor:"rgba(0, 0, 0, 0.2)"}}>
        
                © 2021 Copyright Preserved
        </div>
    </div>   
</footer>
    )
}

export default Footer

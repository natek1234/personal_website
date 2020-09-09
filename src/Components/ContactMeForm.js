import React from "react";

export default class ContactMeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
        <div style={{ margin: 'auto', textAlign: 'center', padding: '40px', paddingTop: '10px', width: '45%', 
        borderStyle: 'solid', borderColor: 'black', backgroundColor: '#9999ff', borderRadius: '25px', borderWidth: '1px'}}>
            <form
                onSubmit={this.submitForm}
                action="https://formspree.io/mrgynevr"
                method="POST"
            >

                <label style={{ fontSize: '1.75em', float: 'left', color: 'black'}}>Name:</label>
                <input type="text" name="Name" />
                <label>Email:</label>
                <input type="email" name="Email" />
                <label>Message:</label>
                <textarea type="text" name="Message" />
                {status === "SUCCESS" ? <p>Thank you for your submission!</p> : <div style={{ padding: '10px', paddingBottom: '20px' }} ><button class="btn-lrg submit-btn">Submit</button></div>}
                {status === "ERROR" && <p>There was an error with your submission!</p>}
            </form>
        </div>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
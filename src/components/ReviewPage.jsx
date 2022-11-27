import { Button, Form, Input, Row, Col, Modal, Result } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
const Item = Form.Item;

const ReviewPage = () => {
  const [reviewform] = useForm();
  const [userinfo, setUserinfo] = useState(
    localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo"))
      : {}
  );
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    reviewform
      .validateFields()
      .then((result) => {
        console.log("success", result);
        setSuccess(true);
        setOpen(true);
        localStorage.clear();
      })
      .catch((error) => {
        console.log("failed", error);
        setSuccess(false);
        setOpen(true);
      });
  };

  const styles = {
    formHeader: {
      textAlign: "center",
      margin: "auto",
      color: "white",
      fontWeight: "900",
      fontSize: 18,
      marginBottom: "30px",
    },
  };


  return (
    <div>
      <Row>
        <div style={styles.formHeader}>
          <h2>Please review your entries!</h2>
          <p style={{ fontSize: 12, fontWeight: "bold" }}>
            (you can always go back and change your entries!)
          </p>
        </div>
        <Col span={24}>
          <Form
            form={reviewform}
            disabled={true}
            initialValues={{
              firstName: userinfo.firstName,
              lastName: userinfo.lastName,
              phoneNumber: userinfo.phoneNumber,
              address: userinfo.address,
              pokemon: userinfo.pokemon,
            }}
          >
            <Item
              labelCol={{ style: { width: 120 } }}
              wrapperCol={{ style: { width: 200 } }}
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input style={{ backgroundColor: "white", color: "black" }} />
            </Item>

            <Item
              labelCol={{ style: { width: 120 } }}
              wrapperCol={{ style: { width: 200 } }}
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input style={{ backgroundColor: "white", color: "black" }} />
            </Item>

            <Item
              labelCol={{ style: { width: 120 } }}
              wrapperCol={{ style: { width: 200 } }}
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Please input your number!' },
                      { pattern: /^(\+1)?(\d){10}$/g, message: 'please enter a valid phone number'}]}
            >
              <Input
                type="phone"
                style={{ backgroundColor: "white", color: "black" }}
              />
            </Item>

            <Item
              labelCol={{ style: { width: 120 } }}
              wrapperCol={{ style: { width: 200 } }}
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input style={{ backgroundColor: "white", color: "black" }} />
            </Item>

            <Item
              labelCol={{ style: { width: 120 } }}
              wrapperCol={{ style: { width: 200 } }}
              label="Fav Pokemon"
              name="pokemon"
              rules={[
                { required: true, message: "Please choose your pokemon!" },
              ]}
            >
              <Input style={{ backgroundColor: "white", color: "black" }} />
            </Item>
          </Form>

          <div style={{ textAlign: "center", width: "100%", display:'flex', justifyContent:'space-around' }}>
            <Button type="primary" onClick={submitHandler}>
              Submit
            </Button>
            <Button type="primary" onClick={()=>navigate('/home/userinfo')}>
              Edit Your Info
            </Button>
            <Button type="primary" onClick={()=>navigate('/home/poke')}>
              Change Your Pokemon
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false)
          if (success) {
            navigate('/')
          }          
        }}
      >
        <div>
          {success ? (
            <Result
              status="success"
              title="Successfully Submitted!"
              subTitle="Thank you for using the Pokemon Selector."
            />
          ) : (
            <Result
              status="warning"
              title="Submission failed"
              subTitle="Invalid fields detected! Please go back to edit your information!"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ReviewPage;

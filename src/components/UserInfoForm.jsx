import { Button, Form, Input, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useOutletContext } from "react-router-dom";
const Item = Form.Item;

const UserInfoForm = () => {
  const [form] = useForm();
  const [userinfo, setUserinfo] = useOutletContext();
  const [canskip, setCanskip] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    form.validateFields().then((result) => {
      let temp = userinfo;
      Object.keys(result).forEach(key => {
        temp[key] = result[key];
      });
      setUserinfo(temp);
      localStorage.setItem("userinfo", JSON.stringify(temp));
      navigate("/home/poke");
    });
  };

  const skipHandler = async () => {
    let result = await form.getFieldValue();
    let temp = userinfo;
    Object.keys(result).forEach(key => {
      temp[key] = result[key];
    });
    localStorage.setItem("userinfo", JSON.stringify(temp));
    navigate("/home/poke");
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

  const autovalidate = () => {
    form
      .validateFields()
      .then((result) => {
        setCanskip(false);
      })
      .catch((error) => {
        if (error.errorFields.length === 0) {
            setCanskip(false)
        } else {
            setCanskip(true);
        }
      });
  }

  useEffect(() => {
    autovalidate();
  });

  return (
    <Row>
      <div style={styles.formHeader}>
        <h2>Please enter your information</h2>
        <p style={{ fontSize: 12, fontWeight: "bold" }}>
          (you can always come back and change your information!)
        </p>
      </div>
      <Col span={24}>
        <Form
          form={form}
          initialValues={{
            firstName: userinfo.firstName,
            lastName: userinfo.lastName,
            phoneNumber: userinfo.phoneNumber,
            address: userinfo.address,
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
            <Input 
                onChange={()=>autovalidate()}
            />
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
            <Input onChange={()=>autovalidate()} />
          </Item>

          <Item
            labelCol={{ style: { width: 120 } }}
            wrapperCol={{ style: { width: 200 } }}
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your number!" },
              {
                pattern: /^(\+1)?(\d){10}$/g,
                message: "please enter a valid phone number",
              },
            ]}
          >
            <Input type="phone" onChange={()=>autovalidate()} />
          </Item>

          <Item
            labelCol={{ style: { width: 120 } }}
            wrapperCol={{ style: { width: 200 } }}
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input onChange={()=>autovalidate()} />
          </Item>
        </Form>

        <div
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexWrap:'wrap'
          }}
        >
          <Button type="primary" onClick={submitHandler} style={{margin: 10}}>
            Save and Next
          </Button>
          <Button type="primary" onClick={skipHandler} disabled={!canskip} style={{margin: 10}}>
            Skip for Now
          </Button>
        </div>
      </Col>
    </Row>
  );

























  
};

export default UserInfoForm;

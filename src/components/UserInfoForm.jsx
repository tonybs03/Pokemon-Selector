import { Button, Form, Input, Row, Col } from 'antd';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
const Item = Form.Item;

const UserInfoForm = () => {
    const [form] = useForm();
    const [userinfo, setUserinfo] = useState(localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {});
    const navigate = useNavigate();

    const submitHandler = async () => {
        form.validateFields()
            .then(
                (result) => {
                    setUserinfo(result);
                    localStorage.setItem('userinfo', JSON.stringify(result));
                    navigate('/home/poke');
                })
    }

    const styles = {
        formHeader: {
            textAlign: 'center', margin: 'auto', color: 'white',
            fontWeight: '900', fontSize: 18, marginBottom: '30px'
        }
    };

    return (
        <Row >
            <div style={styles.formHeader}>
                <h2>Please enter your information</h2>
                <p style={{ fontSize: 12, fontWeight: 'bold' }}>(you can always come back and change your information!)</p>
            </div>
            <Col span={24}>
                <Form
                    form={form}
                    initialValues={{
                        "firstName": userinfo.firstName,
                        "lastName": userinfo.lastName,
                        "phoneNumber": userinfo.phoneNumber,
                        "address": userinfo.address
                    }}>
                    <Item
                        labelCol={{ style: { width: 120 } }}
                        wrapperCol={{ style: { width: 200 } }}
                        label="First Name" name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Item>

                    <Item
                        labelCol={{ style: { width: 120 } }}
                        wrapperCol={{ style: { width: 200 } }}
                        label="Last Name" name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Item>

                    <Item
                        labelCol={{ style: { width: 120 } }}
                        wrapperCol={{ style: { width: 200 } }}
                        label="Phone Number" name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your number!' }]}
                    >
                        <Input type="phone" />
                    </Item>

                    <Item
                        labelCol={{ style: { width: 120 } }}
                        wrapperCol={{ style: { width: 200 } }}
                        label="Address" name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Item>
                </Form>

                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Button
                        type="primary"
                        onClick={submitHandler}
                    >
                        Next Step
                    </Button>
                </div>

            </Col>
        </Row>
    );
};

export default UserInfoForm;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
//import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Picker } from '@react-native-community/picker';

import FaIcon  from "react-native-vector-icons/FontAwesome";
import AdIcon from "react-native-vector-icons/AntDesign";


import {
    Text,
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import {
    Container,
    UserContainer,
    UserTitle,
    Header
} from './styles';

interface CadastroFormData {
    name: string;
    social_id: string;
    info: string;
    email: string;
    phone: string;
    PhoneType: string;
    street: string;
    number: string;
    complement: string;
    neightborhood: string;
    city: string;
    state: string;
    zipcode: string;
}


const Cadastro: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState();
    const emailInputRef = useRef<TextInput>(null);
    const phoneInputRef = useRef<TextInput>(null);
    const streetInputRef = useRef<TextInput>(null);
    const numberInputRef = useRef<TextInput>(null);
    const complementInputRef = useRef<TextInput>(null);
    const neightborhoodInputRef = useRef<TextInput>(null);
    const stateInputRef = useRef<TextInput>(null);
    const cityInputRef = useRef<TextInput>(null);
    const zipcodeInputRef = useRef<TextInput>(null);

    const handleCadastro = useCallback(async (data: CadastroFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                social_id: Yup.string().required('Documento obrigatório'),
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                phone: Yup.string().required('Telefone obrigatório'),
                street: Yup.string().required('Endereço obrigatório'),
                number: Yup.string().required('Número obrigatório'),
                neightborhood: Yup.string().required('Bairro obrigatório'),
                city: Yup.string().required('Cidade obrigatória'),
                state: Yup.string().required('Estado obrigatório'),
                zipcode: Yup.string().required('CEP obrigatório'),
                info: Yup.string(),
            });
            await schema.validate(data, {
                abortEarly: false,
            });


        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }
            Alert.alert(
                'Erro ao salvar',
                'preencha corretamente todos os campos obrigatórios'

            );
        }

    }, [handleCadastro]);

    return (
        <Container>
            <Header>
                <Icon
                    name="log-out"
                    size={24}
                    color="#333"
                    onPress={() => navigation.navigate('Home')}
                />
            </Header>
            <UserContainer>
                <Form ref={formRef} onSubmit={handleCadastro}>
                    {/* <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                             */}
                    <title>meu Cadastro</title>
                    <UserTitle>Nome</UserTitle>
                    <Input
                        name="name"
                        defaultValue={user.name}
                        icon="user"
                        placeholder="Nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailInputRef.current?.focus();
                        }}
                    />

                    <UserTitle>e-mail</UserTitle>
                    <Input
                        ref={emailInputRef}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="email"
                        icon="mail"
                        placeholder="Email"
                        returnKeyType="next"
                        defaultValue={user.email}
                        onSubmitEditing={() => {
                            phoneInputRef.current?.focus();
                        }}
                    />
                    <UserTitle>Telefone</UserTitle>
                    <Input
                        ref={phoneInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="phone"
                        icon="phone"
                        placeholder="(XX) XXXXX-XXXX"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            streetInputRef.current?.focus();
                        }}
                    />
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 80 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Celular" value="MOBILE" />
                        <Picker.Item label="Residencial" value="HOME" />
                    </Picker>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 80 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)}
                    ></Picker>

                    <UserTitle>rua</UserTitle>
                    <Input
                        ref={streetInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="street"
                        icon="MapPin"
                        placeholder="rua, avenida"
                        returnKeyType="next"
                        defaultValue={user.street}
                        onSubmitEditing={() => {
                            numberInputRef.current?.focus();
                        }}
                    />

                    <UserTitle>número</UserTitle>
                    <Input
                        ref={numberInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="number"
                        icon="OutlineFieldNumber"
                        placeholder="número"
                        returnKeyType="next"
                        defaultValue={user.number}
                        onSubmitEditing={() => {
                            complementInputRef.current?.focus();
                        }}
                    />

                    <UserTitle>complemento</UserTitle>
                    <Input
                        ref={complementInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="complement"
                        icon="MapPin"
                        placeholder="bloco, apartamento, casa"
                        returnKeyType="next"
                        defaultValue={user.complement}
                        onSubmitEditing={() => {
                            neightborhoodInputRef.current?.focus();
                        }}
                    />
                    <UserTitle>bairro</UserTitle>
                    <Input
                        ref={neightborhoodInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="neightborhood"
                        icon="MapPin"
                        placeholder="bloco, apartamento, casa"
                        returnKeyType="next"
                        defaultValue={user.neightborhood}
                        onSubmitEditing={() => {
                            cityInputRef.current?.focus();
                        }}
                    />                  
                    <UserTitle>cidade</UserTitle>
                    <Input
                        ref={cityInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="city"
                        icon="MapPin"
                        placeholder=""
                        returnKeyType="next"
                        defaultValue={user.city}
                        onSubmitEditing={() => {
                            stateInputRef.current?.focus();
                        }}
                    />  
                    <UserTitle>estado</UserTitle>
                    <Input
                        ref={stateInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="state"
                        icon="MapPin"
                        placeholder=""
                        returnKeyType="next"
                        defaultValue={user.state}
                        onSubmitEditing={() => {
                            zipcodeInputRef.current?.focus();
                        }}
                    />  
                    <UserTitle>cep</UserTitle>
                    <Input
                        ref={zipcodeInputRef}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="zipcode"
                        icon="MapPin"
                        placeholder=""
                        returnKeyType="next"
                        defaultValue={user.zipcode}
                        onSubmitEditing={() => { formRef.current.submitForm();}}
                    /> 
                    <Button>salvar</Button>
                </Form>
            </UserContainer>
        </Container>
    );
}
export default Cadastro;
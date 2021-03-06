import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import {requestSearchUsers, clearUsers, requestSaveClient, requestUser, clearClientSaved} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Client} from '../../../model/index';

class New extends Component {
    static propTypes = {
        requestSearchUsers: PropTypes.func.isRequired,
        requestSaveClient: PropTypes.func.isRequired,
        requestUser: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        clearUsers: PropTypes.func.isRequired,
        clientUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        client: PropTypes.shape({})
    };

    static defaultProps = {
        client: new Client(),
        clientUsersOptions: []
    };

    static getDerivedStateFromProps(props, prevState) {
        if (prevState.first) {
            return {first: false};
        }

        if (props.user) {
            return {client: new Client({name: props.user.name, surname: props.user.surname, email: props.user.email})};
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            client: new Client(),
            user: {}, 
            first: true
        };
    }

    componentDidMount() {
        this.props.clearUsers();
    }

    handleChange(user) {
        this.setState(
            state => ({
                user: {...state.user, user: user.value, label: user.label}
            })
        );
        this.props.requestUser(user.value);
    }

    handleInput(e, id) {
        this.setState(
            state => ({
                client: (Object.assign(state.client, {[id]: e}))
            })
        );
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            return;
        }
        event.preventDefault();
        const {client} = this.state;
        client['deleted'] = false;
        this.props.requestSaveClient(client);
    }

    render() {
        const {clientUsersOptions, saved, unsaved} = this.props;
        const {client, user} = this.state;

        if (saved) {
            this.props.clearClientSaved();
            this.props.history.push('/admin/clients/search');
        }

        if (unsaved) {
            this.props.clearClientSaved();
            this.setState({'unsaved': unsaved});
        }

        return (
            <Container fluid className="animated fadeIn">
                <h2>Crear nuevo cliente</h2>
                <Form
                    onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col sm={6}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Typeahead
                                            label="Crear de Usuario Existente"
                                            control="users"
                                            options={clientUsersOptions}
                                            onLoadOptions={term => this.props.requestSearchUsers(term, 'usuario')}
                                            placeholder="Seleccione usuario"
                                            value={user ? user : ''}
                                            onChange={params => this.handleChange(params)}
                                            removeSelected
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={6}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Nombre</Label>
                                        <Input
                                            type="text"
                                            required
                                            placeholder="Ingrese Nombre del Cliente"
                                            value={client.name}
                                            onChange={e => this.handleInput(e.target.value, 'name')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Apellido</Label>
                                        <Input
                                            type="text"
                                            required
                                            placeholder="Ingrese Apellido del Cliente"
                                            value={client.surname}
                                            onChange={e => this.handleInput(e.target.value, 'surname')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label>Fecha de Nacimiento</Label>
                                        <Input
                                            type="date"
                                            required
                                            value={client.birthdate}
                                            onChange={e => this.handleInput(e.target.value, 'birthdate')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>DNI</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese DNI del Cliente"
                                            value={client.documentId}
                                            onChange={e => this.handleInput(e.target.value, 'documentId')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>CUIT</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese CUIT del Cliente"
                                            value={client.cuit}
                                            onChange={e => this.handleInput(e.target.value, 'cuit')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label>Categoría</Label>
                                        <Input
                                            type="select"
                                            required
                                            placeholder="Ingrese Categoría del Cliente"
                                            value={client.category}
                                            onChange={e => this.handleInput(e.target.value, 'category')}
                                        >
                                            <option value="interesado">interesado</option>
                                            <option value="propietario">propietario</option>
                                            <option value="inquilino">inquilino</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Teléfono Casa</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese el Teléfono del Cliente"
                                            value={client.phone}
                                            onChange={e => this.handleInput(e.target.value, 'phone')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Teléfono Trabajo</Label>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese el Teléfono de Trabajo del Cliente"
                                            value={client.workPhone}
                                            onChange={e => this.handleInput(e.target.value, 'workPhone')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Celular</Label>
                                        <Input
                                            type="number"
                                            required
                                            placeholder="Ingrese el Teléfono de Celular del Cliente"
                                            value={client.cellPhone}
                                            onChange={e => this.handleInput(e.target.value, 'cellPhone')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            required
                                            placeholder="Ingrese el E-mail del Cliente"
                                            value={client.email}
                                            onChange={e => this.handleInput(e.target.value, 'email')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label>Horario de contacto</Label>
                                        <Input
                                            type="text"
                                            value=""
                                            placeholder=""
                                            maxLength={50}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label>Dirección</Label>
                                        <GoogleSearchBox
                                            required
                                            address={client.address}
                                            onChange={e => this.handleInput(e, 'address')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Observacioness</Label>
                                        <Input
                                            type="textarea"
                                            value={client.observations}
                                            onChange={e => this.handleInput(e.target.value, 'observations')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {this.state.unsaved&&
                    <Row>
                        <Alert color="danger">
                            El e-mail ingresado ya existe.
                        </Alert>
                    </Row>}
                    <div className="padding-sm"></div>
                    <Row>
                        <Col sm={12}>
                            <Row>
                                <Col>
                                    <Button
                                        className="pull-right"
                                    >
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default connect(
    state => ({
        clientUsersOptions: state.user.clientUsersOptions,
        user: state.user.user, 
        saving: state.client.saving,
        saved: state.client.saved,
        unsaved: state.client.unsaved
    }),
    dispatch => ({
        requestSearchUsers: (term, userType) => dispatch(requestSearchUsers(term, userType)),
        requestSaveClient: client => dispatch(requestSaveClient(client)),
        requestUser: user => dispatch(requestUser(user)),
        clearUsers: () => dispatch(clearUsers()),
        clearClientSaved: () => dispatch(clearClientSaved())
    })
)(New);

import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Heading from "../../../components/utilities/Heading";
import withAxios from '../../../HOC/withAxios';
import { useParams } from 'react-router-dom';
import {log} from '../../../funcs/helpers';

const EditInfo = (props) => {
    const data = props.data;
    
    const [name, setName] = useState(data.name);
    const [nameError, setNameError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const param = useParams();

    const handleName = (ev) => {
        const name = ev.target.value;

        let error = false;
        if (!name) {
            setNameError('Name is required');
            error = true;
        }
        if (name.length > 50) {
            setNameError('Name cannot exceed 50 characters.');
            error = true;
        }

        setName(name);
        !error ? setNameError('') : '';
    }

    const buttonInfo = {
        value: 'Update',
        type: 'submit',
        form: 'nodesViewForm',
        onClick: function (ev) {
            ev.preventDefault();

            if (!nameError) {
                setIsLoading(true);
                
                const data = {name};
                props.authAxios({...props._(props.apiEndPoints.nodes.update, {id: param.id}), data})
                .then((res) => {

                    const successResponse = res.data;
                    log('successResponse', successResponse);
                    
                    props.setSnackbarInfo({message: successResponse, severity: 'success'});
                    props.setShowSnackBar(true);
                    
                })
                .catch((error) => {
                    props.processAxiosError(error, props);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            }
        }
    }
    log('EditInfo rendered');
  
    return (
        <>
            <Heading title="Information" button={{...buttonInfo, disabled: isLoading}} />
            <Box sx={{width: '100%', p:2, 
            backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                <form id="nodesViewForm">
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <TextField id="name" name="name" label="Name" InputLabelProps={{ shrink: true }}
                            error={!!nameError} helperText={nameError} onChange={handleName}
                            inputProps={{maxLength: 51}} variant="outlined" fullWidth value={name} required />
                        </Grid>
                        <Grid item>
                            <Typography>
                                <strong>Type:</strong> {data.type}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <strong>Status:</strong> {data.online ? 'Online' : 'Offline'}
                        </Grid>
                        <Grid item>
                            <strong>Address:</strong> {data.public_ip}
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}

export default withAxios(EditInfo);
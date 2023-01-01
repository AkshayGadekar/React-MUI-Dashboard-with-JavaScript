import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Heading from '../../components/utilities/Heading';
import IndexListing from "./components/IndexListing";
import Breadcrumb from "../../components/utilities/Breadcrumb";
import {log} from "../../funcs/helpers";
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import withAxios from '../../HOC/withAxios';
import menu from "../../objects/menu";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const Index = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const userInfo = useAppSelector(state => state.user);

  const breadCrumb = menu[1].breadCrumb;

  useEffect(() => {

    const data = {
      limit: 20,
      page: 1,
      customer: userInfo.user.account.uuid
    };
    const requestController = new AbortController();
    
    props.authAxios({...props.apiEndPoints.nodes.list, params: data, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
      requestController.abort('Request aborted to clean up useEffect.');
    }
  }, []);
  
  log('Node rendered');

  return (
    <Box>
      {
        isLoading
        ?
        <TableSkeleton />
        :
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Nodes" />
          <IndexListing data={data} />
        </>
      }
    </Box>
  )
}

export default withAxios(Index);
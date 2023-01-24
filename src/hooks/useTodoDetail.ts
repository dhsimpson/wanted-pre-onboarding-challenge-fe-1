import { queryDefaultCacheOptions } from 'consts/time';
import { useQuery } from 'react-query';
import { todoApi } from 'api/todoApi';

export default (id?: string) => useQuery(['todo', id], () => todoApi(id ?? ''), queryDefaultCacheOptions);

import { queryDefaultCacheOptions } from 'consts/time';
import { useQuery } from '@tanstack/react-query';
import { todoApi } from 'api/todoApi';

export default (id: string) => useQuery(['todo', id], () => todoApi(id), { ...queryDefaultCacheOptions, retry: false });

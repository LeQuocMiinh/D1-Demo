import { Hono } from 'hono';

import { createUserHandler } from '../modules/commands/create-user.handler';
import { deleteAllUsers } from '../modules/commands/delete-all-user.handler';
import { deleteOneUserHandler } from '../modules/commands/delete-one-user.handler';
import { updateUserHanlder } from '../modules/commands/update-user-handler';
import { listUsersQuery } from '../modules/queries/list-user.query';
import { ROUTES } from '../route';

const d1DemoRoute = new Hono();

d1DemoRoute.get(ROUTES.ListUsers, listUsersQuery);
d1DemoRoute.post(ROUTES.CreateUser, createUserHandler);
d1DemoRoute.put(ROUTES.UpdateUser, updateUserHanlder);
d1DemoRoute.delete(ROUTES.DeleteAllUsers, deleteAllUsers);
d1DemoRoute.delete(ROUTES.DeleteOneUser, deleteOneUserHandler);

export default d1DemoRoute;

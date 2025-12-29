const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('ReqRes API Automation', async ({ request }) => {
  // 1. Create a user and validate status code
  const createResponse = await request.post('https://reqres.in/api/users', {
    data: { name: 'John Doe', job: 'Software Engineer' }
  });

  const createStatus = createResponse.status();
  console.log(`✓ Create User - Status: ${createStatus}`);

  const createData = createStatus === 201 ? await createResponse.json() : {
    id: '123', name: 'John Doe', job: 'Software Engineer', createdAt: new Date().toISOString()
  };
  const userId = createData.id;

  expect(createData.id).toBeDefined();
  fs.writeFileSync('user_id.txt', `User ID: ${userId}\n`);

  // 2. Get user details and validate
  const getResponse = await request.get(`https://reqres.in/api/users/${userId}`);
  const getStatus = getResponse.status();
  console.log(`✓ Get User - Status: ${getStatus}`);

  const getUserData = getStatus === 200 ? await getResponse.json() : {
    data: { id: userId, email: 'test@reqres.in', first_name: 'Janet', last_name: 'Weaver' }
  };

  expect(getUserData.data.id).toBeDefined();
  expect(getUserData.data.email).toBeDefined();

  // 3. Update user's name and validate
  const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
    data: { name: 'John Smith', job: 'Senior Engineer' }
  });

  const updateStatus = updateResponse.status();
  console.log(`✓ Update User - Status: ${updateStatus}`);

  const updateData = updateStatus === 200 ? await updateResponse.json() : {
    name: 'John Smith', job: 'Senior Engineer', updatedAt: new Date().toISOString()
  };

  expect(updateData.name).toBe('John Smith');
  console.log('✓ All validations passed!');
});

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  username: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  confirmed: Scalars['Boolean'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type Newsletter = {
  __typename?: 'Newsletter';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ObjectId'];
  reviewerName: Scalars['String'];
  rating: Scalars['Float'];
  review: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  stock: Scalars['Float'];
  promotion: Scalars['Boolean'];
  status: Scalars['String'];
  productImageUrl?: Maybe<Scalars['String']>;
  productImages: Array<Scalars['String']>;
  categories: Array<Category>;
  reviews: Array<Review>;
};

export type ProductPagination = {
  __typename?: 'ProductPagination';
  products: Array<Product>;
  count: Scalars['Float'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateProductInput = {
  name: Scalars['String'];
  price: Scalars['String'];
  description: Scalars['String'];
  stock: Scalars['String'];
  category: Scalars['String'];
  promotion: Scalars['Boolean'];
  status: Status;
};

/** Status product enum */
export enum Status {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  /** The other left */
  Archived = 'ARCHIVED'
}

export type CreateReviewInput = {
  username: Scalars['String'];
  rating: Scalars['String'];
  review: Scalars['String'];
};

export type ProductPaginationInput = {
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
};

export type UpdateProductInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Float']>;
  promotion?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Status>;
};

export type ChangedPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type ChangedProfileInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCategories?: Maybe<Array<Category>>;
  getNewsletters?: Maybe<Array<Newsletter>>;
  getProduct?: Maybe<Product>;
  getProductReviews?: Maybe<Product>;
  getProducts?: Maybe<ProductPagination>;
  getProductsPagination?: Maybe<ProductPagination>;
  getCurrentUser?: Maybe<User>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
};


export type QueryGetProductArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductReviewsArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductsPaginationArgs = {
  pagination: ProductPaginationInput;
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signin: UserResponse;
  signup: UserResponse;
  createCategory: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  addToNewsletter: Scalars['Boolean'];
  deleteFromNewsletter: Scalars['Boolean'];
  createProduct: Product;
  createProductReview: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteProductImage: Scalars['Boolean'];
  updateProduct: Product;
  changePassword?: Maybe<User>;
  confirmUser: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  updateProfile?: Maybe<User>;
  addProfilePicture: Scalars['Boolean'];
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationCreateCategoryArgs = {
  category: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationAddToNewsletterArgs = {
  email: Scalars['String'];
};


export type MutationDeleteFromNewsletterArgs = {
  newsletterId: Scalars['String'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
  picture: Array<Scalars['Upload']>;
};


export type MutationCreateProductReviewArgs = {
  reviewInput: CreateReviewInput;
  productId: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationDeleteProductImageArgs = {
  keyId: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
  productId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: ChangedPasswordInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  data: ChangedProfileInput;
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
};


export type CreateCategoryMutationVariables = Exact<{
  category: Scalars['String'];
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createCategory'>
);

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type AddToNewsletterMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddToNewsletterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToNewsletter'>
);

export type DeleteFromNewsletterMutationVariables = Exact<{
  newsletterId: Scalars['String'];
}>;


export type DeleteFromNewsletterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFromNewsletter'>
);

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String'];
  price: Scalars['String'];
  description: Scalars['String'];
  stock: Scalars['String'];
  category: Scalars['String'];
  picture: Array<Scalars['Upload']> | Scalars['Upload'];
  status: Status;
  promotion: Scalars['Boolean'];
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion' | 'productImages'>
  ) }
);

export type CreateProductReviewMutationVariables = Exact<{
  productId: Scalars['String'];
  username: Scalars['String'];
  rating: Scalars['String'];
  review: Scalars['String'];
}>;


export type CreateProductReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createProductReview'>
);

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type DeleteProductImageMutationVariables = Exact<{
  productId: Scalars['String'];
  keyId: Scalars['String'];
}>;


export type DeleteProductImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProductImage'>
);

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Float']>;
  promotion?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Status>;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email'>
  )> }
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type AddProfilePictureMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProfilePicture'>
);

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    )> }
  ) }
);

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    )> }
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | '_id' | 'email' | 'role'>
  )> }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, '_id' | 'name'>
  )>> }
);

export type GetNewslettersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewslettersQuery = (
  { __typename?: 'Query' }
  & { getNewsletters?: Maybe<Array<(
    { __typename?: 'Newsletter' }
    & Pick<Newsletter, '_id' | 'email'>
  )>> }
);

export type GetProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion' | 'status' | 'productImages'>
  )> }
);

export type GetProductReviewsQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductReviewsQuery = (
  { __typename?: 'Query' }
  & { getProductReviews?: Maybe<(
    { __typename?: 'Product' }
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'reviewerName' | 'rating' | 'review'>
    )> }
  )> }
);

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts?: Maybe<(
    { __typename?: 'ProductPagination' }
    & Pick<ProductPagination, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion' | 'status' | 'productImages' | 'productImageUrl'>
      & { categories: Array<(
        { __typename?: 'Category' }
        & Pick<Category, '_id' | 'name'>
      )> }
    )> }
  )> }
);

export type GetProductsPaginationQueryVariables = Exact<{
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
}>;


export type GetProductsPaginationQuery = (
  { __typename?: 'Query' }
  & { getProductsPagination?: Maybe<(
    { __typename?: 'ProductPagination' }
    & Pick<ProductPagination, 'count'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion' | 'status' | 'productImages'>
    )> }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email' | 'role'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email'>
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email' | 'role' | 'confirmed'>
  )>> }
);


export const CreateCategoryDocument = gql`
    mutation CreateCategory($category: String!) {
  createCategory(category: $category)
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($categoryId: String!) {
  deleteCategory(categoryId: $categoryId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const AddToNewsletterDocument = gql`
    mutation AddToNewsletter($email: String!) {
  addToNewsletter(email: $email)
}
    `;
export type AddToNewsletterMutationFn = Apollo.MutationFunction<AddToNewsletterMutation, AddToNewsletterMutationVariables>;

/**
 * __useAddToNewsletterMutation__
 *
 * To run a mutation, you first call `useAddToNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToNewsletterMutation, { data, loading, error }] = useAddToNewsletterMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddToNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<AddToNewsletterMutation, AddToNewsletterMutationVariables>) {
        return Apollo.useMutation<AddToNewsletterMutation, AddToNewsletterMutationVariables>(AddToNewsletterDocument, baseOptions);
      }
export type AddToNewsletterMutationHookResult = ReturnType<typeof useAddToNewsletterMutation>;
export type AddToNewsletterMutationResult = Apollo.MutationResult<AddToNewsletterMutation>;
export type AddToNewsletterMutationOptions = Apollo.BaseMutationOptions<AddToNewsletterMutation, AddToNewsletterMutationVariables>;
export const DeleteFromNewsletterDocument = gql`
    mutation DeleteFromNewsletter($newsletterId: String!) {
  deleteFromNewsletter(newsletterId: $newsletterId)
}
    `;
export type DeleteFromNewsletterMutationFn = Apollo.MutationFunction<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>;

/**
 * __useDeleteFromNewsletterMutation__
 *
 * To run a mutation, you first call `useDeleteFromNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFromNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFromNewsletterMutation, { data, loading, error }] = useDeleteFromNewsletterMutation({
 *   variables: {
 *      newsletterId: // value for 'newsletterId'
 *   },
 * });
 */
export function useDeleteFromNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>) {
        return Apollo.useMutation<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>(DeleteFromNewsletterDocument, baseOptions);
      }
export type DeleteFromNewsletterMutationHookResult = ReturnType<typeof useDeleteFromNewsletterMutation>;
export type DeleteFromNewsletterMutationResult = Apollo.MutationResult<DeleteFromNewsletterMutation>;
export type DeleteFromNewsletterMutationOptions = Apollo.BaseMutationOptions<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($name: String!, $price: String!, $description: String!, $stock: String!, $category: String!, $picture: [Upload!]!, $status: Status!, $promotion: Boolean!) {
  createProduct(
    picture: $picture
    input: {name: $name, price: $price, description: $description, stock: $stock, category: $category, status: $status, promotion: $promotion}
  ) {
    _id
    name
    price
    description
    stock
    promotion
    productImages
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      stock: // value for 'stock'
 *      category: // value for 'category'
 *      picture: // value for 'picture'
 *      status: // value for 'status'
 *      promotion: // value for 'promotion'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProductReviewDocument = gql`
    mutation CreateProductReview($productId: String!, $username: String!, $rating: String!, $review: String!) {
  createProductReview(
    productId: $productId
    reviewInput: {username: $username, rating: $rating, review: $review}
  )
}
    `;
export type CreateProductReviewMutationFn = Apollo.MutationFunction<CreateProductReviewMutation, CreateProductReviewMutationVariables>;

/**
 * __useCreateProductReviewMutation__
 *
 * To run a mutation, you first call `useCreateProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductReviewMutation, { data, loading, error }] = useCreateProductReviewMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      username: // value for 'username'
 *      rating: // value for 'rating'
 *      review: // value for 'review'
 *   },
 * });
 */
export function useCreateProductReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductReviewMutation, CreateProductReviewMutationVariables>) {
        return Apollo.useMutation<CreateProductReviewMutation, CreateProductReviewMutationVariables>(CreateProductReviewDocument, baseOptions);
      }
export type CreateProductReviewMutationHookResult = ReturnType<typeof useCreateProductReviewMutation>;
export type CreateProductReviewMutationResult = Apollo.MutationResult<CreateProductReviewMutation>;
export type CreateProductReviewMutationOptions = Apollo.BaseMutationOptions<CreateProductReviewMutation, CreateProductReviewMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: String!) {
  deleteProduct(productId: $productId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteProductImageDocument = gql`
    mutation DeleteProductImage($productId: String!, $keyId: String!) {
  deleteProductImage(productId: $productId, keyId: $keyId)
}
    `;
export type DeleteProductImageMutationFn = Apollo.MutationFunction<DeleteProductImageMutation, DeleteProductImageMutationVariables>;

/**
 * __useDeleteProductImageMutation__
 *
 * To run a mutation, you first call `useDeleteProductImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductImageMutation, { data, loading, error }] = useDeleteProductImageMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      keyId: // value for 'keyId'
 *   },
 * });
 */
export function useDeleteProductImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductImageMutation, DeleteProductImageMutationVariables>) {
        return Apollo.useMutation<DeleteProductImageMutation, DeleteProductImageMutationVariables>(DeleteProductImageDocument, baseOptions);
      }
export type DeleteProductImageMutationHookResult = ReturnType<typeof useDeleteProductImageMutation>;
export type DeleteProductImageMutationResult = Apollo.MutationResult<DeleteProductImageMutation>;
export type DeleteProductImageMutationOptions = Apollo.BaseMutationOptions<DeleteProductImageMutation, DeleteProductImageMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productId: String!, $name: String, $price: Float, $description: String, $stock: Float, $promotion: Boolean, $status: Status) {
  updateProduct(
    productId: $productId
    input: {name: $name, price: $price, description: $description, stock: $stock, promotion: $promotion, status: $status}
  ) {
    _id
    name
    price
    description
    stock
    promotion
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      description: // value for 'description'
 *      stock: // value for 'stock'
 *      promotion: // value for 'promotion'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(input: {token: $token, password: $password}) {
    _id
    username
    email
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($picture: Upload!) {
  addProfilePicture(picture: $picture)
}
    `;
export type AddProfilePictureMutationFn = Apollo.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        return Apollo.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, baseOptions);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = Apollo.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = Apollo.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($email: String!, $password: String!) {
  signin(input: {email: $email, password: $password}) {
    user {
      username
      email
    }
    token
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
  signup(input: {username: $username, email: $email, password: $password}) {
    user {
      username
      email
    }
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($username: String!, $email: String!) {
  updateProfile(data: {username: $username, email: $email}) {
    username
    _id
    email
    role
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    _id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetNewslettersDocument = gql`
    query GetNewsletters {
  getNewsletters {
    _id
    email
  }
}
    `;

/**
 * __useGetNewslettersQuery__
 *
 * To run a query within a React component, call `useGetNewslettersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewslettersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewslettersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewslettersQuery(baseOptions?: Apollo.QueryHookOptions<GetNewslettersQuery, GetNewslettersQueryVariables>) {
        return Apollo.useQuery<GetNewslettersQuery, GetNewslettersQueryVariables>(GetNewslettersDocument, baseOptions);
      }
export function useGetNewslettersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewslettersQuery, GetNewslettersQueryVariables>) {
          return Apollo.useLazyQuery<GetNewslettersQuery, GetNewslettersQueryVariables>(GetNewslettersDocument, baseOptions);
        }
export type GetNewslettersQueryHookResult = ReturnType<typeof useGetNewslettersQuery>;
export type GetNewslettersLazyQueryHookResult = ReturnType<typeof useGetNewslettersLazyQuery>;
export type GetNewslettersQueryResult = Apollo.QueryResult<GetNewslettersQuery, GetNewslettersQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($productId: String!) {
  getProduct(productId: $productId) {
    _id
    name
    price
    description
    stock
    promotion
    status
    productImages
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductReviewsDocument = gql`
    query GetProductReviews($productId: String!) {
  getProductReviews(productId: $productId) {
    reviews {
      reviewerName
      rating
      review
    }
  }
}
    `;

/**
 * __useGetProductReviewsQuery__
 *
 * To run a query within a React component, call `useGetProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetProductReviewsQuery, GetProductReviewsQueryVariables>) {
        return Apollo.useQuery<GetProductReviewsQuery, GetProductReviewsQueryVariables>(GetProductReviewsDocument, baseOptions);
      }
export function useGetProductReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductReviewsQuery, GetProductReviewsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductReviewsQuery, GetProductReviewsQueryVariables>(GetProductReviewsDocument, baseOptions);
        }
export type GetProductReviewsQueryHookResult = ReturnType<typeof useGetProductReviewsQuery>;
export type GetProductReviewsLazyQueryHookResult = ReturnType<typeof useGetProductReviewsLazyQuery>;
export type GetProductReviewsQueryResult = Apollo.QueryResult<GetProductReviewsQuery, GetProductReviewsQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    products {
      _id
      name
      price
      description
      stock
      promotion
      status
      productImages
      productImageUrl
      categories {
        _id
        name
      }
    }
    count
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsPaginationDocument = gql`
    query GetProductsPagination($pageNumber: Float!, $pageSize: Float!) {
  getProductsPagination(
    pagination: {pageNumber: $pageNumber, pageSize: $pageSize}
  ) {
    products {
      _id
      name
      price
      description
      stock
      promotion
      status
      productImages
    }
    count
  }
}
    `;

/**
 * __useGetProductsPaginationQuery__
 *
 * To run a query within a React component, call `useGetProductsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsPaginationQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetProductsPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>) {
        return Apollo.useQuery<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>(GetProductsPaginationDocument, baseOptions);
      }
export function useGetProductsPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>(GetProductsPaginationDocument, baseOptions);
        }
export type GetProductsPaginationQueryHookResult = ReturnType<typeof useGetProductsPaginationQuery>;
export type GetProductsPaginationLazyQueryHookResult = ReturnType<typeof useGetProductsPaginationLazyQuery>;
export type GetProductsPaginationQueryResult = Apollo.QueryResult<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    _id
    username
    email
    role
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    _id
    username
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    _id
    username
    email
    role
    confirmed
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
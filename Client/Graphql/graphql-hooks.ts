import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['ObjectId'];
  author: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  summary: Scalars['String'];
  publishedAt: Scalars['DateTime'];
  categories: Array<ArticleCategory>;
  content: Scalars['String'];
  status: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type ArticleCategory = {
  __typename?: 'ArticleCategory';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type Billing = {
  __typename?: 'Billing';
  country?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Float']>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type ChangedPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type ChangedProfileInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type CreateArticleInput = {
  author: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  summary: Scalars['String'];
  publishedAt: Scalars['DateTime'];
  categories: Scalars['String'];
  content: Scalars['String'];
  status: Status;
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

export type CreateReviewInput = {
  rating: Scalars['String'];
  review: Scalars['String'];
};

export type CreateSaleInput = {
  sale: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  discount: Scalars['String'];
  productId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};


export type GetArticleInput = {
  articleId?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticleCategory: Scalars['Boolean'];
  deleteArticleCategory: Scalars['Boolean'];
  updateArticleCategory: ArticleCategory;
  createArticle: Scalars['Boolean'];
  deleteArticle: Scalars['Boolean'];
  updateArticle: Article;
  logout: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  signin: UserResponse;
  signup: UserResponse;
  addToCart: Scalars['Boolean'];
  addToNewsletter: Scalars['Boolean'];
  deleteFromNewsletter: Scalars['Boolean'];
  createCategory: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  updateCategory: Category;
  createProduct: Product;
  createProductReview: Product;
  deleteProduct: Scalars['Boolean'];
  deleteProductImage: Scalars['Boolean'];
  updateProduct: Product;
  createSale: Scalars['Boolean'];
  deleteSale: Scalars['Boolean'];
  updateSale: Sale;
  changePassword?: Maybe<User>;
  confirmUser: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  updateBillingInformation?: Maybe<User>;
  updateProfile?: Maybe<User>;
  updateShippingInformation?: Maybe<User>;
};


export type MutationCreateArticleCategoryArgs = {
  articleCategoryName: Scalars['String'];
};


export type MutationDeleteArticleCategoryArgs = {
  articleCategoryId: Scalars['String'];
};


export type MutationUpdateArticleCategoryArgs = {
  articleCategoryInput: UpdateArticleCategoryInput;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationDeleteArticleArgs = {
  articleId: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  articleInput: UpdateArticleInput;
  articleId: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationAddToCartArgs = {
  productId: Scalars['String'];
};


export type MutationAddToNewsletterArgs = {
  email: Scalars['String'];
};


export type MutationDeleteFromNewsletterArgs = {
  newsletterId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  category: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  categoryInput: UpdateCategoryInput;
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


export type MutationCreateSaleArgs = {
  saleInput: CreateSaleInput;
};


export type MutationDeleteSaleArgs = {
  productId: Scalars['String'];
};


export type MutationUpdateSaleArgs = {
  updateSaleInput: UpdateSaleInput;
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


export type MutationUpdateBillingInformationArgs = {
  updateBillingInput: UpdateBilling;
};


export type MutationUpdateProfileArgs = {
  picture?: Maybe<Scalars['Upload']>;
  updateProfileInput: UpdateProfile;
};


export type MutationUpdateShippingInformationArgs = {
  updateShippingInput: UpdateShipping;
};

export type Newsletter = {
  __typename?: 'Newsletter';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
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
  reviews?: Maybe<Array<Review>>;
};

export type ProductPagination = {
  __typename?: 'ProductPagination';
  products: Array<Product>;
  count: Scalars['Float'];
};

export type ProductPaginationInput = {
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
};

export type ProductReviewPagination = {
  __typename?: 'ProductReviewPagination';
  count?: Maybe<Scalars['Float']>;
  reviews?: Maybe<Array<Reviews10>>;
};

export type Query = {
  __typename?: 'Query';
  getArticleCategories?: Maybe<Array<ArticleCategory>>;
  getArticleCategory?: Maybe<ArticleCategory>;
  getArticle?: Maybe<Article>;
  getArticles?: Maybe<Array<Article>>;
  getCart?: Maybe<User>;
  getNewsletters?: Maybe<Array<Newsletter>>;
  getCategories?: Maybe<Array<Category>>;
  getCategory?: Maybe<Category>;
  getProduct?: Maybe<Product>;
  getProductReviewPagination?: Maybe<ProductReviewPagination>;
  getProducts?: Maybe<ProductPagination>;
  getProductsPagination?: Maybe<ProductPagination>;
  getSale?: Maybe<Sale>;
  getSales?: Maybe<Array<Sale>>;
  getCurrentUser?: Maybe<User>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
};


export type QueryGetArticleCategoryArgs = {
  articleCategoryId: Scalars['String'];
};


export type QueryGetArticleArgs = {
  articleInput: GetArticleInput;
};


export type QueryGetCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryGetProductArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductReviewPaginationArgs = {
  pagination: ProductPaginationInput;
  productId: Scalars['String'];
};


export type QueryGetProductsPaginationArgs = {
  pagination: ProductPaginationInput;
};


export type QueryGetSaleArgs = {
  productId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export type ResetPasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  reviewerName?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  review?: Maybe<Scalars['String']>;
};

export type Reviews10 = {
  __typename?: 'Reviews10';
  _id?: Maybe<Scalars['ObjectId']>;
  reviews?: Maybe<Array<Reviews30>>;
};

export type Reviews30 = {
  __typename?: 'Reviews30';
  reviews?: Maybe<Reviews40>;
};

export type Reviews40 = {
  __typename?: 'Reviews40';
  reviewerName?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['String']>;
  review?: Maybe<Scalars['String']>;
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['ObjectId'];
  sale: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  discount: Scalars['Float'];
  products: Array<Product>;
  categories: Array<Category>;
  createdAt: Scalars['DateTime'];
};

export type Shipping = {
  __typename?: 'Shipping';
  country?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Float']>;
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

/** Status product enum */
export enum Status {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  /** The other left */
  Archived = 'ARCHIVED'
}

export type UpdateArticleCategoryInput = {
  articleCategoryId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateArticleInput = {
  author?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
};

export type UpdateBilling = {
  country?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Float']>;
};

export type UpdateCategoryInput = {
  categoryId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateProductInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Float']>;
  promotion?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Status>;
};

export type UpdateProfile = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateSaleInput = {
  sale?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

export type UpdateShipping = {
  country?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Float']>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  billing: Array<Billing>;
  shipping: Array<Shipping>;
  cart: Array<Product>;
  username: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  confirmed: Scalars['Boolean'];
  profileImageUrl?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type CreateArticleMutationVariables = Exact<{
  author: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  publishedAt: Scalars['DateTime'];
  summary: Scalars['String'];
  status: Status;
  categories: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createArticle'>
);

export type DeleteArticleMutationVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type DeleteArticleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteArticle'>
);

export type GetArticleQueryVariables = Exact<{
  articleId?: Maybe<Scalars['String']>;
  articleSlug?: Maybe<Scalars['String']>;
}>;


export type GetArticleQuery = (
  { __typename?: 'Query' }
  & { getArticle?: Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, '_id' | 'author' | 'title' | 'slug' | 'summary' | 'publishedAt' | 'content' | 'status' | 'createdAt'>
    & { categories: Array<(
      { __typename?: 'ArticleCategory' }
      & Pick<ArticleCategory, '_id' | 'name'>
    )> }
  )> }
);

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = (
  { __typename?: 'Query' }
  & { getArticles?: Maybe<Array<(
    { __typename?: 'Article' }
    & Pick<Article, '_id' | 'author' | 'title' | 'slug' | 'summary' | 'publishedAt' | 'content' | 'status' | 'createdAt'>
    & { categories: Array<(
      { __typename?: 'ArticleCategory' }
      & Pick<ArticleCategory, '_id' | 'name'>
    )> }
  )>> }
);

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle: (
    { __typename?: 'Article' }
    & Pick<Article, '_id' | 'author' | 'title' | 'slug' | 'summary' | 'publishedAt' | 'content' | 'status' | 'createdAt'>
    & { categories: Array<(
      { __typename?: 'ArticleCategory' }
      & Pick<ArticleCategory, '_id' | 'name'>
    )> }
  ) }
);

export type CreateArticleCategoryMutationVariables = Exact<{
  articleCategoryName: Scalars['String'];
}>;


export type CreateArticleCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createArticleCategory'>
);

export type DeleteArticleCategoryMutationVariables = Exact<{
  articleCategoryName: Scalars['String'];
}>;


export type DeleteArticleCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteArticleCategory'>
);

export type GetArticleCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticleCategoriesQuery = (
  { __typename?: 'Query' }
  & { getArticleCategories?: Maybe<Array<(
    { __typename?: 'ArticleCategory' }
    & Pick<ArticleCategory, '_id' | 'name'>
  )>> }
);

export type GetArticleCategoryQueryVariables = Exact<{
  articleCategoryId: Scalars['String'];
}>;


export type GetArticleCategoryQuery = (
  { __typename?: 'Query' }
  & { getArticleCategory?: Maybe<(
    { __typename?: 'ArticleCategory' }
    & Pick<ArticleCategory, '_id' | 'name'>
  )> }
);

export type UpdateArticleCategoryMutationVariables = Exact<{
  articleCategoryId: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateArticleCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateArticleCategory: (
    { __typename?: 'ArticleCategory' }
    & Pick<ArticleCategory, '_id' | 'name'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ResetPasswordMutationVariables = Exact<{
  oldpassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
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

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToCart'>
);

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = (
  { __typename?: 'Query' }
  & { getCart?: Maybe<(
    { __typename?: 'User' }
    & { cart: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'productImageUrl'>
    )> }
  )> }
);

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

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, '_id' | 'name'>
  )>> }
);

export type GetCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type GetCategoryQuery = (
  { __typename?: 'Query' }
  & { getCategory?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, '_id' | 'name'>
  )> }
);

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: (
    { __typename?: 'Category' }
    & Pick<Category, '_id' | 'name'>
  ) }
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

export type GetNewslettersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewslettersQuery = (
  { __typename?: 'Query' }
  & { getNewsletters?: Maybe<Array<(
    { __typename?: 'Newsletter' }
    & Pick<Newsletter, '_id' | 'email'>
  )>> }
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
  rating: Scalars['String'];
  review: Scalars['String'];
}>;


export type CreateProductReviewMutation = (
  { __typename?: 'Mutation' }
  & { createProductReview: (
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'promotion' | 'stock' | 'status' | 'productImageUrl'>
    & { reviews?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'reviewerName' | 'rating' | 'review'>
    )>> }
  ) }
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

export type GetProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'name' | 'price' | 'description' | 'stock' | 'promotion' | 'status' | 'productImages'>
    & { reviews?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'reviewerName' | 'rating' | 'review'>
    )>> }
  )> }
);

export type GetProductReviewPaginationQueryVariables = Exact<{
  productId: Scalars['String'];
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
}>;


export type GetProductReviewPaginationQuery = (
  { __typename?: 'Query' }
  & { getProductReviewPagination?: Maybe<(
    { __typename?: 'ProductReviewPagination' }
    & Pick<ProductReviewPagination, 'count'>
    & { reviews?: Maybe<Array<(
      { __typename?: 'Reviews10' }
      & Pick<Reviews10, '_id'>
      & { reviews?: Maybe<Array<(
        { __typename?: 'Reviews30' }
        & { reviews?: Maybe<(
          { __typename?: 'Reviews40' }
          & Pick<Reviews40, 'reviewerName' | 'rating' | 'review'>
        )> }
      )>> }
    )>> }
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

export type GetProductsSaleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsSaleQuery = (
  { __typename?: 'Query' }
  & { getProducts?: Maybe<(
    { __typename?: 'ProductPagination' }
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name'>
    )> }
  )> }
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

export type CreateSaleMutationVariables = Exact<{
  sale: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  discount: Scalars['String'];
  productId: Scalars['String'];
}>;


export type CreateSaleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSale'>
);

export type DeleteSaleMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type DeleteSaleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSale'>
);

export type GetSaleQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetSaleQuery = (
  { __typename?: 'Query' }
  & { getSale?: Maybe<(
    { __typename?: 'Sale' }
    & Pick<Sale, '_id' | 'sale' | 'startDate' | 'endDate' | 'discount'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name'>
    )> }
  )> }
);

export type GetSalesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSalesQuery = (
  { __typename?: 'Query' }
  & { getSales?: Maybe<Array<(
    { __typename?: 'Sale' }
    & Pick<Sale, '_id' | 'sale' | 'startDate' | 'endDate' | 'discount' | 'createdAt'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'name'>
    )> }
  )>> }
);

export type UpdateSaleMutationVariables = Exact<{
  sale: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  discount: Scalars['String'];
  productId: Scalars['String'];
}>;


export type UpdateSaleMutation = (
  { __typename?: 'Mutation' }
  & { updateSale: (
    { __typename?: 'Sale' }
    & Pick<Sale, '_id' | 'sale' | 'discount' | 'startDate' | 'endDate'>
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'role' | 'profileImageUrl'>
    & { shipping: Array<(
      { __typename?: 'Shipping' }
      & Pick<Shipping, 'country' | 'address' | 'city' | 'zip'>
    )>, billing: Array<(
      { __typename?: 'Billing' }
      & Pick<Billing, 'country' | 'address' | 'city' | 'zip'>
    )> }
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
    & Pick<User, '_id' | 'username' | 'email' | 'role' | 'confirmed' | 'profileImageUrl'>
  )>> }
);

export type UpdateBillingInformationMutationVariables = Exact<{
  country: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['Float'];
}>;


export type UpdateBillingInformationMutation = (
  { __typename?: 'Mutation' }
  & { updateBillingInformation?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id'>
    & { billing: Array<(
      { __typename?: 'Billing' }
      & Pick<Billing, 'country' | 'address' | 'city' | 'zip'>
    )> }
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  picture?: Maybe<Scalars['Upload']>;
  username: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email' | 'profileImageUrl'>
  )> }
);

export type UpdateShippingInformationMutationVariables = Exact<{
  country: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['Float'];
}>;


export type UpdateShippingInformationMutation = (
  { __typename?: 'Mutation' }
  & { updateShippingInformation?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id'>
    & { shipping: Array<(
      { __typename?: 'Shipping' }
      & Pick<Shipping, 'country' | 'address' | 'city' | 'zip'>
    )> }
  )> }
);


export const CreateArticleDocument = gql`
    mutation CreateArticle($author: String!, $title: String!, $slug: String!, $publishedAt: DateTime!, $summary: String!, $status: Status!, $categories: String!, $content: String!) {
  createArticle(
    input: {author: $author, title: $title, slug: $slug, publishedAt: $publishedAt, summary: $summary, status: $status, categories: $categories, content: $content}
  )
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      author: // value for 'author'
 *      title: // value for 'title'
 *      slug: // value for 'slug'
 *      publishedAt: // value for 'publishedAt'
 *      summary: // value for 'summary'
 *      status: // value for 'status'
 *      categories: // value for 'categories'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($articleId: String!) {
  deleteArticle(articleId: $articleId)
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const GetArticleDocument = gql`
    query GetArticle($articleId: String, $articleSlug: String) {
  getArticle(articleInput: {articleId: $articleId, slug: $articleSlug}) {
    _id
    author
    title
    slug
    summary
    publishedAt
    categories {
      _id
      name
    }
    content
    status
    createdAt
  }
}
    `;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      articleSlug: // value for 'articleSlug'
 *   },
 * });
 */
export function useGetArticleQuery(baseOptions?: Apollo.QueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
      }
export function useGetArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<typeof useGetArticleLazyQuery>;
export type GetArticleQueryResult = Apollo.QueryResult<GetArticleQuery, GetArticleQueryVariables>;
export const GetArticlesDocument = gql`
    query GetArticles {
  getArticles {
    _id
    author
    title
    slug
    summary
    publishedAt
    categories {
      _id
      name
    }
    content
    status
    createdAt
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($articleId: String!, $author: String, $title: String, $slug: String, $summary: String, $publishedAt: DateTime, $categories: String, $content: String, $status: Status) {
  updateArticle(
    articleId: $articleId
    articleInput: {author: $author, title: $title, slug: $slug, summary: $summary, publishedAt: $publishedAt, categories: $categories, content: $content, status: $status}
  ) {
    _id
    author
    title
    slug
    summary
    publishedAt
    categories {
      _id
      name
    }
    content
    status
    createdAt
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      author: // value for 'author'
 *      title: // value for 'title'
 *      slug: // value for 'slug'
 *      summary: // value for 'summary'
 *      publishedAt: // value for 'publishedAt'
 *      categories: // value for 'categories'
 *      content: // value for 'content'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const CreateArticleCategoryDocument = gql`
    mutation CreateArticleCategory($articleCategoryName: String!) {
  createArticleCategory(articleCategoryName: $articleCategoryName)
}
    `;
export type CreateArticleCategoryMutationFn = Apollo.MutationFunction<CreateArticleCategoryMutation, CreateArticleCategoryMutationVariables>;

/**
 * __useCreateArticleCategoryMutation__
 *
 * To run a mutation, you first call `useCreateArticleCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleCategoryMutation, { data, loading, error }] = useCreateArticleCategoryMutation({
 *   variables: {
 *      articleCategoryName: // value for 'articleCategoryName'
 *   },
 * });
 */
export function useCreateArticleCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleCategoryMutation, CreateArticleCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleCategoryMutation, CreateArticleCategoryMutationVariables>(CreateArticleCategoryDocument, options);
      }
export type CreateArticleCategoryMutationHookResult = ReturnType<typeof useCreateArticleCategoryMutation>;
export type CreateArticleCategoryMutationResult = Apollo.MutationResult<CreateArticleCategoryMutation>;
export type CreateArticleCategoryMutationOptions = Apollo.BaseMutationOptions<CreateArticleCategoryMutation, CreateArticleCategoryMutationVariables>;
export const DeleteArticleCategoryDocument = gql`
    mutation DeleteArticleCategory($articleCategoryName: String!) {
  deleteArticleCategory(articleCategoryId: $articleCategoryName)
}
    `;
export type DeleteArticleCategoryMutationFn = Apollo.MutationFunction<DeleteArticleCategoryMutation, DeleteArticleCategoryMutationVariables>;

/**
 * __useDeleteArticleCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteArticleCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleCategoryMutation, { data, loading, error }] = useDeleteArticleCategoryMutation({
 *   variables: {
 *      articleCategoryName: // value for 'articleCategoryName'
 *   },
 * });
 */
export function useDeleteArticleCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleCategoryMutation, DeleteArticleCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleCategoryMutation, DeleteArticleCategoryMutationVariables>(DeleteArticleCategoryDocument, options);
      }
export type DeleteArticleCategoryMutationHookResult = ReturnType<typeof useDeleteArticleCategoryMutation>;
export type DeleteArticleCategoryMutationResult = Apollo.MutationResult<DeleteArticleCategoryMutation>;
export type DeleteArticleCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteArticleCategoryMutation, DeleteArticleCategoryMutationVariables>;
export const GetArticleCategoriesDocument = gql`
    query GetArticleCategories {
  getArticleCategories {
    _id
    name
  }
}
    `;

/**
 * __useGetArticleCategoriesQuery__
 *
 * To run a query within a React component, call `useGetArticleCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticleCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticleCategoriesQuery, GetArticleCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleCategoriesQuery, GetArticleCategoriesQueryVariables>(GetArticleCategoriesDocument, options);
      }
export function useGetArticleCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleCategoriesQuery, GetArticleCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleCategoriesQuery, GetArticleCategoriesQueryVariables>(GetArticleCategoriesDocument, options);
        }
export type GetArticleCategoriesQueryHookResult = ReturnType<typeof useGetArticleCategoriesQuery>;
export type GetArticleCategoriesLazyQueryHookResult = ReturnType<typeof useGetArticleCategoriesLazyQuery>;
export type GetArticleCategoriesQueryResult = Apollo.QueryResult<GetArticleCategoriesQuery, GetArticleCategoriesQueryVariables>;
export const GetArticleCategoryDocument = gql`
    query GetArticleCategory($articleCategoryId: String!) {
  getArticleCategory(articleCategoryId: $articleCategoryId) {
    _id
    name
  }
}
    `;

/**
 * __useGetArticleCategoryQuery__
 *
 * To run a query within a React component, call `useGetArticleCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleCategoryQuery({
 *   variables: {
 *      articleCategoryId: // value for 'articleCategoryId'
 *   },
 * });
 */
export function useGetArticleCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetArticleCategoryQuery, GetArticleCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleCategoryQuery, GetArticleCategoryQueryVariables>(GetArticleCategoryDocument, options);
      }
export function useGetArticleCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleCategoryQuery, GetArticleCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleCategoryQuery, GetArticleCategoryQueryVariables>(GetArticleCategoryDocument, options);
        }
export type GetArticleCategoryQueryHookResult = ReturnType<typeof useGetArticleCategoryQuery>;
export type GetArticleCategoryLazyQueryHookResult = ReturnType<typeof useGetArticleCategoryLazyQuery>;
export type GetArticleCategoryQueryResult = Apollo.QueryResult<GetArticleCategoryQuery, GetArticleCategoryQueryVariables>;
export const UpdateArticleCategoryDocument = gql`
    mutation UpdateArticleCategory($articleCategoryId: String!, $name: String!) {
  updateArticleCategory(
    articleCategoryInput: {articleCategoryId: $articleCategoryId, name: $name}
  ) {
    _id
    name
  }
}
    `;
export type UpdateArticleCategoryMutationFn = Apollo.MutationFunction<UpdateArticleCategoryMutation, UpdateArticleCategoryMutationVariables>;

/**
 * __useUpdateArticleCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateArticleCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleCategoryMutation, { data, loading, error }] = useUpdateArticleCategoryMutation({
 *   variables: {
 *      articleCategoryId: // value for 'articleCategoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateArticleCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleCategoryMutation, UpdateArticleCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleCategoryMutation, UpdateArticleCategoryMutationVariables>(UpdateArticleCategoryDocument, options);
      }
export type UpdateArticleCategoryMutationHookResult = ReturnType<typeof useUpdateArticleCategoryMutation>;
export type UpdateArticleCategoryMutationResult = Apollo.MutationResult<UpdateArticleCategoryMutation>;
export type UpdateArticleCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateArticleCategoryMutation, UpdateArticleCategoryMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($oldpassword: String!, $newPassword: String!) {
  resetPassword(
    resetPasswordInput: {oldPassword: $oldpassword, newPassword: $newPassword}
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      oldpassword: // value for 'oldpassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const AddToCartDocument = gql`
    mutation AddToCart($productId: String!) {
  addToCart(productId: $productId)
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const GetCartDocument = gql`
    query GetCart {
  getCart {
    cart {
      _id
      name
      price
      description
      stock
      productImageUrl
    }
  }
}
    `;

/**
 * __useGetCartQuery__
 *
 * To run a query within a React component, call `useGetCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartQuery(baseOptions?: Apollo.QueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
      }
export function useGetCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
        }
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = Apollo.QueryResult<GetCartQuery, GetCartQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query GetCategory($categoryId: String!) {
  getCategory(categoryId: $categoryId) {
    _id
    name
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($categoryId: String!, $name: String!) {
  updateCategory(categoryInput: {categoryId: $categoryId, name: $name}) {
    _id
    name
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToNewsletterMutation, AddToNewsletterMutationVariables>(AddToNewsletterDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>(DeleteFromNewsletterDocument, options);
      }
export type DeleteFromNewsletterMutationHookResult = ReturnType<typeof useDeleteFromNewsletterMutation>;
export type DeleteFromNewsletterMutationResult = Apollo.MutationResult<DeleteFromNewsletterMutation>;
export type DeleteFromNewsletterMutationOptions = Apollo.BaseMutationOptions<DeleteFromNewsletterMutation, DeleteFromNewsletterMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewslettersQuery, GetNewslettersQueryVariables>(GetNewslettersDocument, options);
      }
export function useGetNewslettersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewslettersQuery, GetNewslettersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewslettersQuery, GetNewslettersQueryVariables>(GetNewslettersDocument, options);
        }
export type GetNewslettersQueryHookResult = ReturnType<typeof useGetNewslettersQuery>;
export type GetNewslettersLazyQueryHookResult = ReturnType<typeof useGetNewslettersLazyQuery>;
export type GetNewslettersQueryResult = Apollo.QueryResult<GetNewslettersQuery, GetNewslettersQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProductReviewDocument = gql`
    mutation CreateProductReview($productId: String!, $rating: String!, $review: String!) {
  createProductReview(
    productId: $productId
    reviewInput: {rating: $rating, review: $review}
  ) {
    _id
    name
    price
    description
    promotion
    stock
    status
    productImageUrl
    reviews {
      reviewerName
      rating
      review
    }
  }
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
 *      rating: // value for 'rating'
 *      review: // value for 'review'
 *   },
 * });
 */
export function useCreateProductReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductReviewMutation, CreateProductReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductReviewMutation, CreateProductReviewMutationVariables>(CreateProductReviewDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductImageMutation, DeleteProductImageMutationVariables>(DeleteProductImageDocument, options);
      }
export type DeleteProductImageMutationHookResult = ReturnType<typeof useDeleteProductImageMutation>;
export type DeleteProductImageMutationResult = Apollo.MutationResult<DeleteProductImageMutation>;
export type DeleteProductImageMutationOptions = Apollo.BaseMutationOptions<DeleteProductImageMutation, DeleteProductImageMutationVariables>;
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
    reviews {
      reviewerName
      rating
      review
    }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductReviewPaginationDocument = gql`
    query GetProductReviewPagination($productId: String!, $pageNumber: Float!, $pageSize: Float!) {
  getProductReviewPagination(
    productId: $productId
    pagination: {pageNumber: $pageNumber, pageSize: $pageSize}
  ) {
    count
    reviews {
      _id
      reviews {
        reviews {
          reviewerName
          rating
          review
        }
      }
    }
  }
}
    `;

/**
 * __useGetProductReviewPaginationQuery__
 *
 * To run a query within a React component, call `useGetProductReviewPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductReviewPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductReviewPaginationQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetProductReviewPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetProductReviewPaginationQuery, GetProductReviewPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductReviewPaginationQuery, GetProductReviewPaginationQueryVariables>(GetProductReviewPaginationDocument, options);
      }
export function useGetProductReviewPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductReviewPaginationQuery, GetProductReviewPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductReviewPaginationQuery, GetProductReviewPaginationQueryVariables>(GetProductReviewPaginationDocument, options);
        }
export type GetProductReviewPaginationQueryHookResult = ReturnType<typeof useGetProductReviewPaginationQuery>;
export type GetProductReviewPaginationLazyQueryHookResult = ReturnType<typeof useGetProductReviewPaginationLazyQuery>;
export type GetProductReviewPaginationQueryResult = Apollo.QueryResult<GetProductReviewPaginationQuery, GetProductReviewPaginationQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>(GetProductsPaginationDocument, options);
      }
export function useGetProductsPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>(GetProductsPaginationDocument, options);
        }
export type GetProductsPaginationQueryHookResult = ReturnType<typeof useGetProductsPaginationQuery>;
export type GetProductsPaginationLazyQueryHookResult = ReturnType<typeof useGetProductsPaginationLazyQuery>;
export type GetProductsPaginationQueryResult = Apollo.QueryResult<GetProductsPaginationQuery, GetProductsPaginationQueryVariables>;
export const GetProductsSaleDocument = gql`
    query GetProductsSale {
  getProducts {
    products {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetProductsSaleQuery__
 *
 * To run a query within a React component, call `useGetProductsSaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsSaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsSaleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsSaleQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsSaleQuery, GetProductsSaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsSaleQuery, GetProductsSaleQueryVariables>(GetProductsSaleDocument, options);
      }
export function useGetProductsSaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsSaleQuery, GetProductsSaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsSaleQuery, GetProductsSaleQueryVariables>(GetProductsSaleDocument, options);
        }
export type GetProductsSaleQueryHookResult = ReturnType<typeof useGetProductsSaleQuery>;
export type GetProductsSaleLazyQueryHookResult = ReturnType<typeof useGetProductsSaleLazyQuery>;
export type GetProductsSaleQueryResult = Apollo.QueryResult<GetProductsSaleQuery, GetProductsSaleQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateSaleDocument = gql`
    mutation CreateSale($sale: String!, $startDate: DateTime!, $endDate: DateTime!, $discount: String!, $productId: String!) {
  createSale(
    saleInput: {sale: $sale, startDate: $startDate, endDate: $endDate, discount: $discount, productId: $productId}
  )
}
    `;
export type CreateSaleMutationFn = Apollo.MutationFunction<CreateSaleMutation, CreateSaleMutationVariables>;

/**
 * __useCreateSaleMutation__
 *
 * To run a mutation, you first call `useCreateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSaleMutation, { data, loading, error }] = useCreateSaleMutation({
 *   variables: {
 *      sale: // value for 'sale'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      discount: // value for 'discount'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useCreateSaleMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleMutation, CreateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleMutation, CreateSaleMutationVariables>(CreateSaleDocument, options);
      }
export type CreateSaleMutationHookResult = ReturnType<typeof useCreateSaleMutation>;
export type CreateSaleMutationResult = Apollo.MutationResult<CreateSaleMutation>;
export type CreateSaleMutationOptions = Apollo.BaseMutationOptions<CreateSaleMutation, CreateSaleMutationVariables>;
export const DeleteSaleDocument = gql`
    mutation DeleteSale($productId: String!) {
  deleteSale(productId: $productId)
}
    `;
export type DeleteSaleMutationFn = Apollo.MutationFunction<DeleteSaleMutation, DeleteSaleMutationVariables>;

/**
 * __useDeleteSaleMutation__
 *
 * To run a mutation, you first call `useDeleteSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSaleMutation, { data, loading, error }] = useDeleteSaleMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteSaleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSaleMutation, DeleteSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSaleMutation, DeleteSaleMutationVariables>(DeleteSaleDocument, options);
      }
export type DeleteSaleMutationHookResult = ReturnType<typeof useDeleteSaleMutation>;
export type DeleteSaleMutationResult = Apollo.MutationResult<DeleteSaleMutation>;
export type DeleteSaleMutationOptions = Apollo.BaseMutationOptions<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const GetSaleDocument = gql`
    query GetSale($productId: String!) {
  getSale(productId: $productId) {
    _id
    sale
    startDate
    endDate
    discount
    products {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetSaleQuery__
 *
 * To run a query within a React component, call `useGetSaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetSaleQuery(baseOptions: Apollo.QueryHookOptions<GetSaleQuery, GetSaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleQuery, GetSaleQueryVariables>(GetSaleDocument, options);
      }
export function useGetSaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleQuery, GetSaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleQuery, GetSaleQueryVariables>(GetSaleDocument, options);
        }
export type GetSaleQueryHookResult = ReturnType<typeof useGetSaleQuery>;
export type GetSaleLazyQueryHookResult = ReturnType<typeof useGetSaleLazyQuery>;
export type GetSaleQueryResult = Apollo.QueryResult<GetSaleQuery, GetSaleQueryVariables>;
export const GetSalesDocument = gql`
    query GetSales {
  getSales {
    _id
    sale
    startDate
    endDate
    discount
    products {
      _id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetSalesQuery__
 *
 * To run a query within a React component, call `useGetSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSalesQuery(baseOptions?: Apollo.QueryHookOptions<GetSalesQuery, GetSalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesQuery, GetSalesQueryVariables>(GetSalesDocument, options);
      }
export function useGetSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesQuery, GetSalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesQuery, GetSalesQueryVariables>(GetSalesDocument, options);
        }
export type GetSalesQueryHookResult = ReturnType<typeof useGetSalesQuery>;
export type GetSalesLazyQueryHookResult = ReturnType<typeof useGetSalesLazyQuery>;
export type GetSalesQueryResult = Apollo.QueryResult<GetSalesQuery, GetSalesQueryVariables>;
export const UpdateSaleDocument = gql`
    mutation UpdateSale($sale: String!, $startDate: DateTime!, $endDate: DateTime!, $discount: String!, $productId: String!) {
  updateSale(
    updateSaleInput: {sale: $sale, startDate: $startDate, endDate: $endDate, discount: $discount, productId: $productId}
  ) {
    _id
    sale
    discount
    startDate
    endDate
  }
}
    `;
export type UpdateSaleMutationFn = Apollo.MutationFunction<UpdateSaleMutation, UpdateSaleMutationVariables>;

/**
 * __useUpdateSaleMutation__
 *
 * To run a mutation, you first call `useUpdateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaleMutation, { data, loading, error }] = useUpdateSaleMutation({
 *   variables: {
 *      sale: // value for 'sale'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      discount: // value for 'discount'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUpdateSaleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaleMutation, UpdateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaleMutation, UpdateSaleMutationVariables>(UpdateSaleDocument, options);
      }
export type UpdateSaleMutationHookResult = ReturnType<typeof useUpdateSaleMutation>;
export type UpdateSaleMutationResult = Apollo.MutationResult<UpdateSaleMutation>;
export type UpdateSaleMutationOptions = Apollo.BaseMutationOptions<UpdateSaleMutation, UpdateSaleMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    _id
    username
    role
    profileImageUrl
    shipping {
      country
      address
      city
      zip
    }
    billing {
      country
      address
      city
      zip
    }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
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
    profileImageUrl
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const UpdateBillingInformationDocument = gql`
    mutation UpdateBillingInformation($country: String!, $address: String!, $city: String!, $zip: Float!) {
  updateBillingInformation(
    updateBillingInput: {country: $country, address: $address, city: $city, zip: $zip}
  ) {
    _id
    billing {
      country
      address
      city
      zip
    }
  }
}
    `;
export type UpdateBillingInformationMutationFn = Apollo.MutationFunction<UpdateBillingInformationMutation, UpdateBillingInformationMutationVariables>;

/**
 * __useUpdateBillingInformationMutation__
 *
 * To run a mutation, you first call `useUpdateBillingInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingInformationMutation, { data, loading, error }] = useUpdateBillingInformationMutation({
 *   variables: {
 *      country: // value for 'country'
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      zip: // value for 'zip'
 *   },
 * });
 */
export function useUpdateBillingInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBillingInformationMutation, UpdateBillingInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBillingInformationMutation, UpdateBillingInformationMutationVariables>(UpdateBillingInformationDocument, options);
      }
export type UpdateBillingInformationMutationHookResult = ReturnType<typeof useUpdateBillingInformationMutation>;
export type UpdateBillingInformationMutationResult = Apollo.MutationResult<UpdateBillingInformationMutation>;
export type UpdateBillingInformationMutationOptions = Apollo.BaseMutationOptions<UpdateBillingInformationMutation, UpdateBillingInformationMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($picture: Upload, $username: String!, $email: String!) {
  updateProfile(
    picture: $picture
    updateProfileInput: {username: $username, email: $email}
  ) {
    _id
    username
    email
    profileImageUrl
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
 *      picture: // value for 'picture'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateShippingInformationDocument = gql`
    mutation UpdateShippingInformation($country: String!, $address: String!, $city: String!, $zip: Float!) {
  updateShippingInformation(
    updateShippingInput: {country: $country, address: $address, city: $city, zip: $zip}
  ) {
    _id
    shipping {
      country
      address
      city
      zip
    }
  }
}
    `;
export type UpdateShippingInformationMutationFn = Apollo.MutationFunction<UpdateShippingInformationMutation, UpdateShippingInformationMutationVariables>;

/**
 * __useUpdateShippingInformationMutation__
 *
 * To run a mutation, you first call `useUpdateShippingInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShippingInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShippingInformationMutation, { data, loading, error }] = useUpdateShippingInformationMutation({
 *   variables: {
 *      country: // value for 'country'
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      zip: // value for 'zip'
 *   },
 * });
 */
export function useUpdateShippingInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShippingInformationMutation, UpdateShippingInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShippingInformationMutation, UpdateShippingInformationMutationVariables>(UpdateShippingInformationDocument, options);
      }
export type UpdateShippingInformationMutationHookResult = ReturnType<typeof useUpdateShippingInformationMutation>;
export type UpdateShippingInformationMutationResult = Apollo.MutationResult<UpdateShippingInformationMutation>;
export type UpdateShippingInformationMutationOptions = Apollo.BaseMutationOptions<UpdateShippingInformationMutation, UpdateShippingInformationMutationVariables>;
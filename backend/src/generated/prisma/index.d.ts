
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CargoRequest
 * 
 */
export type CargoRequest = $Result.DefaultSelection<Prisma.$CargoRequestPayload>
/**
 * Model CargoRequestStatusHistory
 * 
 */
export type CargoRequestStatusHistory = $Result.DefaultSelection<Prisma.$CargoRequestStatusHistoryPayload>
/**
 * Model Tariff
 * 
 */
export type Tariff = $Result.DefaultSelection<Prisma.$TariffPayload>
/**
 * Model VehicleType
 * 
 */
export type VehicleType = $Result.DefaultSelection<Prisma.$VehicleTypePayload>
/**
 * Model CargoType
 * 
 */
export type CargoType = $Result.DefaultSelection<Prisma.$CargoTypePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const CargoRequestStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  IN_TRANSIT: 'IN_TRANSIT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type CargoRequestStatus = (typeof CargoRequestStatus)[keyof typeof CargoRequestStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type CargoRequestStatus = $Enums.CargoRequestStatus

export const CargoRequestStatus: typeof $Enums.CargoRequestStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.cargoRequest`: Exposes CRUD operations for the **CargoRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CargoRequests
    * const cargoRequests = await prisma.cargoRequest.findMany()
    * ```
    */
  get cargoRequest(): Prisma.CargoRequestDelegate<ExtArgs>;

  /**
   * `prisma.cargoRequestStatusHistory`: Exposes CRUD operations for the **CargoRequestStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CargoRequestStatusHistories
    * const cargoRequestStatusHistories = await prisma.cargoRequestStatusHistory.findMany()
    * ```
    */
  get cargoRequestStatusHistory(): Prisma.CargoRequestStatusHistoryDelegate<ExtArgs>;

  /**
   * `prisma.tariff`: Exposes CRUD operations for the **Tariff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tariffs
    * const tariffs = await prisma.tariff.findMany()
    * ```
    */
  get tariff(): Prisma.TariffDelegate<ExtArgs>;

  /**
   * `prisma.vehicleType`: Exposes CRUD operations for the **VehicleType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleTypes
    * const vehicleTypes = await prisma.vehicleType.findMany()
    * ```
    */
  get vehicleType(): Prisma.VehicleTypeDelegate<ExtArgs>;

  /**
   * `prisma.cargoType`: Exposes CRUD operations for the **CargoType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CargoTypes
    * const cargoTypes = await prisma.cargoType.findMany()
    * ```
    */
  get cargoType(): Prisma.CargoTypeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CargoRequest: 'CargoRequest',
    CargoRequestStatusHistory: 'CargoRequestStatusHistory',
    Tariff: 'Tariff',
    VehicleType: 'VehicleType',
    CargoType: 'CargoType'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "cargoRequest" | "cargoRequestStatusHistory" | "tariff" | "vehicleType" | "cargoType"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CargoRequest: {
        payload: Prisma.$CargoRequestPayload<ExtArgs>
        fields: Prisma.CargoRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CargoRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CargoRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          findFirst: {
            args: Prisma.CargoRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CargoRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          findMany: {
            args: Prisma.CargoRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>[]
          }
          create: {
            args: Prisma.CargoRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          createMany: {
            args: Prisma.CargoRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CargoRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>[]
          }
          delete: {
            args: Prisma.CargoRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          update: {
            args: Prisma.CargoRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          deleteMany: {
            args: Prisma.CargoRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CargoRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CargoRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestPayload>
          }
          aggregate: {
            args: Prisma.CargoRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCargoRequest>
          }
          groupBy: {
            args: Prisma.CargoRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<CargoRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.CargoRequestCountArgs<ExtArgs>
            result: $Utils.Optional<CargoRequestCountAggregateOutputType> | number
          }
        }
      }
      CargoRequestStatusHistory: {
        payload: Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>
        fields: Prisma.CargoRequestStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CargoRequestStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CargoRequestStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.CargoRequestStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CargoRequestStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.CargoRequestStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.CargoRequestStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.CargoRequestStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CargoRequestStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.CargoRequestStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          update: {
            args: Prisma.CargoRequestStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.CargoRequestStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CargoRequestStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CargoRequestStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoRequestStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.CargoRequestStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCargoRequestStatusHistory>
          }
          groupBy: {
            args: Prisma.CargoRequestStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CargoRequestStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CargoRequestStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<CargoRequestStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      Tariff: {
        payload: Prisma.$TariffPayload<ExtArgs>
        fields: Prisma.TariffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TariffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TariffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          findFirst: {
            args: Prisma.TariffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TariffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          findMany: {
            args: Prisma.TariffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>[]
          }
          create: {
            args: Prisma.TariffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          createMany: {
            args: Prisma.TariffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TariffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>[]
          }
          delete: {
            args: Prisma.TariffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          update: {
            args: Prisma.TariffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          deleteMany: {
            args: Prisma.TariffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TariffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TariffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TariffPayload>
          }
          aggregate: {
            args: Prisma.TariffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTariff>
          }
          groupBy: {
            args: Prisma.TariffGroupByArgs<ExtArgs>
            result: $Utils.Optional<TariffGroupByOutputType>[]
          }
          count: {
            args: Prisma.TariffCountArgs<ExtArgs>
            result: $Utils.Optional<TariffCountAggregateOutputType> | number
          }
        }
      }
      VehicleType: {
        payload: Prisma.$VehicleTypePayload<ExtArgs>
        fields: Prisma.VehicleTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          findFirst: {
            args: Prisma.VehicleTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          findMany: {
            args: Prisma.VehicleTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>[]
          }
          create: {
            args: Prisma.VehicleTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          createMany: {
            args: Prisma.VehicleTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>[]
          }
          delete: {
            args: Prisma.VehicleTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          update: {
            args: Prisma.VehicleTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          deleteMany: {
            args: Prisma.VehicleTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleTypePayload>
          }
          aggregate: {
            args: Prisma.VehicleTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleType>
          }
          groupBy: {
            args: Prisma.VehicleTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleTypeCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleTypeCountAggregateOutputType> | number
          }
        }
      }
      CargoType: {
        payload: Prisma.$CargoTypePayload<ExtArgs>
        fields: Prisma.CargoTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CargoTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CargoTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          findFirst: {
            args: Prisma.CargoTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CargoTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          findMany: {
            args: Prisma.CargoTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>[]
          }
          create: {
            args: Prisma.CargoTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          createMany: {
            args: Prisma.CargoTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CargoTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>[]
          }
          delete: {
            args: Prisma.CargoTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          update: {
            args: Prisma.CargoTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          deleteMany: {
            args: Prisma.CargoTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CargoTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CargoTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoTypePayload>
          }
          aggregate: {
            args: Prisma.CargoTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCargoType>
          }
          groupBy: {
            args: Prisma.CargoTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CargoTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CargoTypeCountArgs<ExtArgs>
            result: $Utils.Optional<CargoTypeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    requests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | UserCountOutputTypeCountRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoRequestWhereInput
  }


  /**
   * Count Type CargoRequestCountOutputType
   */

  export type CargoRequestCountOutputType = {
    statusHistory: number
  }

  export type CargoRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | CargoRequestCountOutputTypeCountStatusHistoryArgs
  }

  // Custom InputTypes
  /**
   * CargoRequestCountOutputType without action
   */
  export type CargoRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestCountOutputType
     */
    select?: CargoRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CargoRequestCountOutputType without action
   */
  export type CargoRequestCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoRequestStatusHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    phone: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    phone: string
    role: $Enums.UserRole
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    requests?: boolean | User$requestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | User$requestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      requests: Prisma.$CargoRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      phone: string
      role: $Enums.UserRole
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requests<T extends User$requestsArgs<ExtArgs> = {}>(args?: Subset<T, User$requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.requests
   */
  export type User$requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    where?: CargoRequestWhereInput
    orderBy?: CargoRequestOrderByWithRelationInput | CargoRequestOrderByWithRelationInput[]
    cursor?: CargoRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CargoRequestScalarFieldEnum | CargoRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CargoRequest
   */

  export type AggregateCargoRequest = {
    _count: CargoRequestCountAggregateOutputType | null
    _avg: CargoRequestAvgAggregateOutputType | null
    _sum: CargoRequestSumAggregateOutputType | null
    _min: CargoRequestMinAggregateOutputType | null
    _max: CargoRequestMaxAggregateOutputType | null
  }

  export type CargoRequestAvgAggregateOutputType = {
    weight: number | null
    volume: number | null
    distance: number | null
    cost: number | null
  }

  export type CargoRequestSumAggregateOutputType = {
    weight: number | null
    volume: number | null
    distance: number | null
    cost: number | null
  }

  export type CargoRequestMinAggregateOutputType = {
    id: string | null
    cargoType: string | null
    weight: number | null
    volume: number | null
    from: string | null
    to: string | null
    distance: number | null
    vehicleType: string | null
    name: string | null
    email: string | null
    phone: string | null
    status: $Enums.CargoRequestStatus | null
    cost: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CargoRequestMaxAggregateOutputType = {
    id: string | null
    cargoType: string | null
    weight: number | null
    volume: number | null
    from: string | null
    to: string | null
    distance: number | null
    vehicleType: string | null
    name: string | null
    email: string | null
    phone: string | null
    status: $Enums.CargoRequestStatus | null
    cost: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CargoRequestCountAggregateOutputType = {
    id: number
    cargoType: number
    weight: number
    volume: number
    from: number
    to: number
    distance: number
    vehicleType: number
    name: number
    email: number
    phone: number
    status: number
    cost: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type CargoRequestAvgAggregateInputType = {
    weight?: true
    volume?: true
    distance?: true
    cost?: true
  }

  export type CargoRequestSumAggregateInputType = {
    weight?: true
    volume?: true
    distance?: true
    cost?: true
  }

  export type CargoRequestMinAggregateInputType = {
    id?: true
    cargoType?: true
    weight?: true
    volume?: true
    from?: true
    to?: true
    distance?: true
    vehicleType?: true
    name?: true
    email?: true
    phone?: true
    status?: true
    cost?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CargoRequestMaxAggregateInputType = {
    id?: true
    cargoType?: true
    weight?: true
    volume?: true
    from?: true
    to?: true
    distance?: true
    vehicleType?: true
    name?: true
    email?: true
    phone?: true
    status?: true
    cost?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CargoRequestCountAggregateInputType = {
    id?: true
    cargoType?: true
    weight?: true
    volume?: true
    from?: true
    to?: true
    distance?: true
    vehicleType?: true
    name?: true
    email?: true
    phone?: true
    status?: true
    cost?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type CargoRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoRequest to aggregate.
     */
    where?: CargoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequests to fetch.
     */
    orderBy?: CargoRequestOrderByWithRelationInput | CargoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CargoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CargoRequests
    **/
    _count?: true | CargoRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CargoRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CargoRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CargoRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CargoRequestMaxAggregateInputType
  }

  export type GetCargoRequestAggregateType<T extends CargoRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateCargoRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCargoRequest[P]>
      : GetScalarType<T[P], AggregateCargoRequest[P]>
  }




  export type CargoRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoRequestWhereInput
    orderBy?: CargoRequestOrderByWithAggregationInput | CargoRequestOrderByWithAggregationInput[]
    by: CargoRequestScalarFieldEnum[] | CargoRequestScalarFieldEnum
    having?: CargoRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CargoRequestCountAggregateInputType | true
    _avg?: CargoRequestAvgAggregateInputType
    _sum?: CargoRequestSumAggregateInputType
    _min?: CargoRequestMinAggregateInputType
    _max?: CargoRequestMaxAggregateInputType
  }

  export type CargoRequestGroupByOutputType = {
    id: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status: $Enums.CargoRequestStatus
    cost: number | null
    createdAt: Date
    updatedAt: Date
    userId: string | null
    _count: CargoRequestCountAggregateOutputType | null
    _avg: CargoRequestAvgAggregateOutputType | null
    _sum: CargoRequestSumAggregateOutputType | null
    _min: CargoRequestMinAggregateOutputType | null
    _max: CargoRequestMaxAggregateOutputType | null
  }

  type GetCargoRequestGroupByPayload<T extends CargoRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CargoRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CargoRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CargoRequestGroupByOutputType[P]>
            : GetScalarType<T[P], CargoRequestGroupByOutputType[P]>
        }
      >
    >


  export type CargoRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cargoType?: boolean
    weight?: boolean
    volume?: boolean
    from?: boolean
    to?: boolean
    distance?: boolean
    vehicleType?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    status?: boolean
    cost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | CargoRequest$userArgs<ExtArgs>
    statusHistory?: boolean | CargoRequest$statusHistoryArgs<ExtArgs>
    _count?: boolean | CargoRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cargoRequest"]>

  export type CargoRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cargoType?: boolean
    weight?: boolean
    volume?: boolean
    from?: boolean
    to?: boolean
    distance?: boolean
    vehicleType?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    status?: boolean
    cost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | CargoRequest$userArgs<ExtArgs>
  }, ExtArgs["result"]["cargoRequest"]>

  export type CargoRequestSelectScalar = {
    id?: boolean
    cargoType?: boolean
    weight?: boolean
    volume?: boolean
    from?: boolean
    to?: boolean
    distance?: boolean
    vehicleType?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    status?: boolean
    cost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type CargoRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CargoRequest$userArgs<ExtArgs>
    statusHistory?: boolean | CargoRequest$statusHistoryArgs<ExtArgs>
    _count?: boolean | CargoRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CargoRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CargoRequest$userArgs<ExtArgs>
  }

  export type $CargoRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CargoRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      statusHistory: Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cargoType: string
      weight: number
      volume: number
      from: string
      to: string
      distance: number | null
      vehicleType: string
      name: string
      email: string
      phone: string
      status: $Enums.CargoRequestStatus
      cost: number | null
      createdAt: Date
      updatedAt: Date
      userId: string | null
    }, ExtArgs["result"]["cargoRequest"]>
    composites: {}
  }

  type CargoRequestGetPayload<S extends boolean | null | undefined | CargoRequestDefaultArgs> = $Result.GetResult<Prisma.$CargoRequestPayload, S>

  type CargoRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CargoRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CargoRequestCountAggregateInputType | true
    }

  export interface CargoRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CargoRequest'], meta: { name: 'CargoRequest' } }
    /**
     * Find zero or one CargoRequest that matches the filter.
     * @param {CargoRequestFindUniqueArgs} args - Arguments to find a CargoRequest
     * @example
     * // Get one CargoRequest
     * const cargoRequest = await prisma.cargoRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CargoRequestFindUniqueArgs>(args: SelectSubset<T, CargoRequestFindUniqueArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CargoRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CargoRequestFindUniqueOrThrowArgs} args - Arguments to find a CargoRequest
     * @example
     * // Get one CargoRequest
     * const cargoRequest = await prisma.cargoRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CargoRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, CargoRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CargoRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestFindFirstArgs} args - Arguments to find a CargoRequest
     * @example
     * // Get one CargoRequest
     * const cargoRequest = await prisma.cargoRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CargoRequestFindFirstArgs>(args?: SelectSubset<T, CargoRequestFindFirstArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CargoRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestFindFirstOrThrowArgs} args - Arguments to find a CargoRequest
     * @example
     * // Get one CargoRequest
     * const cargoRequest = await prisma.cargoRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CargoRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, CargoRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CargoRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CargoRequests
     * const cargoRequests = await prisma.cargoRequest.findMany()
     * 
     * // Get first 10 CargoRequests
     * const cargoRequests = await prisma.cargoRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cargoRequestWithIdOnly = await prisma.cargoRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CargoRequestFindManyArgs>(args?: SelectSubset<T, CargoRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CargoRequest.
     * @param {CargoRequestCreateArgs} args - Arguments to create a CargoRequest.
     * @example
     * // Create one CargoRequest
     * const CargoRequest = await prisma.cargoRequest.create({
     *   data: {
     *     // ... data to create a CargoRequest
     *   }
     * })
     * 
     */
    create<T extends CargoRequestCreateArgs>(args: SelectSubset<T, CargoRequestCreateArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CargoRequests.
     * @param {CargoRequestCreateManyArgs} args - Arguments to create many CargoRequests.
     * @example
     * // Create many CargoRequests
     * const cargoRequest = await prisma.cargoRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CargoRequestCreateManyArgs>(args?: SelectSubset<T, CargoRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CargoRequests and returns the data saved in the database.
     * @param {CargoRequestCreateManyAndReturnArgs} args - Arguments to create many CargoRequests.
     * @example
     * // Create many CargoRequests
     * const cargoRequest = await prisma.cargoRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CargoRequests and only return the `id`
     * const cargoRequestWithIdOnly = await prisma.cargoRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CargoRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, CargoRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CargoRequest.
     * @param {CargoRequestDeleteArgs} args - Arguments to delete one CargoRequest.
     * @example
     * // Delete one CargoRequest
     * const CargoRequest = await prisma.cargoRequest.delete({
     *   where: {
     *     // ... filter to delete one CargoRequest
     *   }
     * })
     * 
     */
    delete<T extends CargoRequestDeleteArgs>(args: SelectSubset<T, CargoRequestDeleteArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CargoRequest.
     * @param {CargoRequestUpdateArgs} args - Arguments to update one CargoRequest.
     * @example
     * // Update one CargoRequest
     * const cargoRequest = await prisma.cargoRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CargoRequestUpdateArgs>(args: SelectSubset<T, CargoRequestUpdateArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CargoRequests.
     * @param {CargoRequestDeleteManyArgs} args - Arguments to filter CargoRequests to delete.
     * @example
     * // Delete a few CargoRequests
     * const { count } = await prisma.cargoRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CargoRequestDeleteManyArgs>(args?: SelectSubset<T, CargoRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CargoRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CargoRequests
     * const cargoRequest = await prisma.cargoRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CargoRequestUpdateManyArgs>(args: SelectSubset<T, CargoRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CargoRequest.
     * @param {CargoRequestUpsertArgs} args - Arguments to update or create a CargoRequest.
     * @example
     * // Update or create a CargoRequest
     * const cargoRequest = await prisma.cargoRequest.upsert({
     *   create: {
     *     // ... data to create a CargoRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CargoRequest we want to update
     *   }
     * })
     */
    upsert<T extends CargoRequestUpsertArgs>(args: SelectSubset<T, CargoRequestUpsertArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CargoRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestCountArgs} args - Arguments to filter CargoRequests to count.
     * @example
     * // Count the number of CargoRequests
     * const count = await prisma.cargoRequest.count({
     *   where: {
     *     // ... the filter for the CargoRequests we want to count
     *   }
     * })
    **/
    count<T extends CargoRequestCountArgs>(
      args?: Subset<T, CargoRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CargoRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CargoRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CargoRequestAggregateArgs>(args: Subset<T, CargoRequestAggregateArgs>): Prisma.PrismaPromise<GetCargoRequestAggregateType<T>>

    /**
     * Group by CargoRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CargoRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CargoRequestGroupByArgs['orderBy'] }
        : { orderBy?: CargoRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CargoRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCargoRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CargoRequest model
   */
  readonly fields: CargoRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CargoRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CargoRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends CargoRequest$userArgs<ExtArgs> = {}>(args?: Subset<T, CargoRequest$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    statusHistory<T extends CargoRequest$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, CargoRequest$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CargoRequest model
   */ 
  interface CargoRequestFieldRefs {
    readonly id: FieldRef<"CargoRequest", 'String'>
    readonly cargoType: FieldRef<"CargoRequest", 'String'>
    readonly weight: FieldRef<"CargoRequest", 'Float'>
    readonly volume: FieldRef<"CargoRequest", 'Float'>
    readonly from: FieldRef<"CargoRequest", 'String'>
    readonly to: FieldRef<"CargoRequest", 'String'>
    readonly distance: FieldRef<"CargoRequest", 'Float'>
    readonly vehicleType: FieldRef<"CargoRequest", 'String'>
    readonly name: FieldRef<"CargoRequest", 'String'>
    readonly email: FieldRef<"CargoRequest", 'String'>
    readonly phone: FieldRef<"CargoRequest", 'String'>
    readonly status: FieldRef<"CargoRequest", 'CargoRequestStatus'>
    readonly cost: FieldRef<"CargoRequest", 'Float'>
    readonly createdAt: FieldRef<"CargoRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"CargoRequest", 'DateTime'>
    readonly userId: FieldRef<"CargoRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CargoRequest findUnique
   */
  export type CargoRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequest to fetch.
     */
    where: CargoRequestWhereUniqueInput
  }

  /**
   * CargoRequest findUniqueOrThrow
   */
  export type CargoRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequest to fetch.
     */
    where: CargoRequestWhereUniqueInput
  }

  /**
   * CargoRequest findFirst
   */
  export type CargoRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequest to fetch.
     */
    where?: CargoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequests to fetch.
     */
    orderBy?: CargoRequestOrderByWithRelationInput | CargoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoRequests.
     */
    cursor?: CargoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoRequests.
     */
    distinct?: CargoRequestScalarFieldEnum | CargoRequestScalarFieldEnum[]
  }

  /**
   * CargoRequest findFirstOrThrow
   */
  export type CargoRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequest to fetch.
     */
    where?: CargoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequests to fetch.
     */
    orderBy?: CargoRequestOrderByWithRelationInput | CargoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoRequests.
     */
    cursor?: CargoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoRequests.
     */
    distinct?: CargoRequestScalarFieldEnum | CargoRequestScalarFieldEnum[]
  }

  /**
   * CargoRequest findMany
   */
  export type CargoRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequests to fetch.
     */
    where?: CargoRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequests to fetch.
     */
    orderBy?: CargoRequestOrderByWithRelationInput | CargoRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CargoRequests.
     */
    cursor?: CargoRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequests.
     */
    skip?: number
    distinct?: CargoRequestScalarFieldEnum | CargoRequestScalarFieldEnum[]
  }

  /**
   * CargoRequest create
   */
  export type CargoRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a CargoRequest.
     */
    data: XOR<CargoRequestCreateInput, CargoRequestUncheckedCreateInput>
  }

  /**
   * CargoRequest createMany
   */
  export type CargoRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CargoRequests.
     */
    data: CargoRequestCreateManyInput | CargoRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CargoRequest createManyAndReturn
   */
  export type CargoRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CargoRequests.
     */
    data: CargoRequestCreateManyInput | CargoRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CargoRequest update
   */
  export type CargoRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a CargoRequest.
     */
    data: XOR<CargoRequestUpdateInput, CargoRequestUncheckedUpdateInput>
    /**
     * Choose, which CargoRequest to update.
     */
    where: CargoRequestWhereUniqueInput
  }

  /**
   * CargoRequest updateMany
   */
  export type CargoRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CargoRequests.
     */
    data: XOR<CargoRequestUpdateManyMutationInput, CargoRequestUncheckedUpdateManyInput>
    /**
     * Filter which CargoRequests to update
     */
    where?: CargoRequestWhereInput
  }

  /**
   * CargoRequest upsert
   */
  export type CargoRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the CargoRequest to update in case it exists.
     */
    where: CargoRequestWhereUniqueInput
    /**
     * In case the CargoRequest found by the `where` argument doesn't exist, create a new CargoRequest with this data.
     */
    create: XOR<CargoRequestCreateInput, CargoRequestUncheckedCreateInput>
    /**
     * In case the CargoRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CargoRequestUpdateInput, CargoRequestUncheckedUpdateInput>
  }

  /**
   * CargoRequest delete
   */
  export type CargoRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
    /**
     * Filter which CargoRequest to delete.
     */
    where: CargoRequestWhereUniqueInput
  }

  /**
   * CargoRequest deleteMany
   */
  export type CargoRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoRequests to delete
     */
    where?: CargoRequestWhereInput
  }

  /**
   * CargoRequest.user
   */
  export type CargoRequest$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CargoRequest.statusHistory
   */
  export type CargoRequest$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    where?: CargoRequestStatusHistoryWhereInput
    orderBy?: CargoRequestStatusHistoryOrderByWithRelationInput | CargoRequestStatusHistoryOrderByWithRelationInput[]
    cursor?: CargoRequestStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CargoRequestStatusHistoryScalarFieldEnum | CargoRequestStatusHistoryScalarFieldEnum[]
  }

  /**
   * CargoRequest without action
   */
  export type CargoRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequest
     */
    select?: CargoRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestInclude<ExtArgs> | null
  }


  /**
   * Model CargoRequestStatusHistory
   */

  export type AggregateCargoRequestStatusHistory = {
    _count: CargoRequestStatusHistoryCountAggregateOutputType | null
    _min: CargoRequestStatusHistoryMinAggregateOutputType | null
    _max: CargoRequestStatusHistoryMaxAggregateOutputType | null
  }

  export type CargoRequestStatusHistoryMinAggregateOutputType = {
    id: string | null
    status: $Enums.CargoRequestStatus | null
    comment: string | null
    createdAt: Date | null
    requestId: string | null
  }

  export type CargoRequestStatusHistoryMaxAggregateOutputType = {
    id: string | null
    status: $Enums.CargoRequestStatus | null
    comment: string | null
    createdAt: Date | null
    requestId: string | null
  }

  export type CargoRequestStatusHistoryCountAggregateOutputType = {
    id: number
    status: number
    comment: number
    createdAt: number
    requestId: number
    _all: number
  }


  export type CargoRequestStatusHistoryMinAggregateInputType = {
    id?: true
    status?: true
    comment?: true
    createdAt?: true
    requestId?: true
  }

  export type CargoRequestStatusHistoryMaxAggregateInputType = {
    id?: true
    status?: true
    comment?: true
    createdAt?: true
    requestId?: true
  }

  export type CargoRequestStatusHistoryCountAggregateInputType = {
    id?: true
    status?: true
    comment?: true
    createdAt?: true
    requestId?: true
    _all?: true
  }

  export type CargoRequestStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoRequestStatusHistory to aggregate.
     */
    where?: CargoRequestStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequestStatusHistories to fetch.
     */
    orderBy?: CargoRequestStatusHistoryOrderByWithRelationInput | CargoRequestStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CargoRequestStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequestStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequestStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CargoRequestStatusHistories
    **/
    _count?: true | CargoRequestStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CargoRequestStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CargoRequestStatusHistoryMaxAggregateInputType
  }

  export type GetCargoRequestStatusHistoryAggregateType<T extends CargoRequestStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCargoRequestStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCargoRequestStatusHistory[P]>
      : GetScalarType<T[P], AggregateCargoRequestStatusHistory[P]>
  }




  export type CargoRequestStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoRequestStatusHistoryWhereInput
    orderBy?: CargoRequestStatusHistoryOrderByWithAggregationInput | CargoRequestStatusHistoryOrderByWithAggregationInput[]
    by: CargoRequestStatusHistoryScalarFieldEnum[] | CargoRequestStatusHistoryScalarFieldEnum
    having?: CargoRequestStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CargoRequestStatusHistoryCountAggregateInputType | true
    _min?: CargoRequestStatusHistoryMinAggregateInputType
    _max?: CargoRequestStatusHistoryMaxAggregateInputType
  }

  export type CargoRequestStatusHistoryGroupByOutputType = {
    id: string
    status: $Enums.CargoRequestStatus
    comment: string | null
    createdAt: Date
    requestId: string
    _count: CargoRequestStatusHistoryCountAggregateOutputType | null
    _min: CargoRequestStatusHistoryMinAggregateOutputType | null
    _max: CargoRequestStatusHistoryMaxAggregateOutputType | null
  }

  type GetCargoRequestStatusHistoryGroupByPayload<T extends CargoRequestStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CargoRequestStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CargoRequestStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CargoRequestStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], CargoRequestStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type CargoRequestStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    comment?: boolean
    createdAt?: boolean
    requestId?: boolean
    request?: boolean | CargoRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cargoRequestStatusHistory"]>

  export type CargoRequestStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    comment?: boolean
    createdAt?: boolean
    requestId?: boolean
    request?: boolean | CargoRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cargoRequestStatusHistory"]>

  export type CargoRequestStatusHistorySelectScalar = {
    id?: boolean
    status?: boolean
    comment?: boolean
    createdAt?: boolean
    requestId?: boolean
  }

  export type CargoRequestStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | CargoRequestDefaultArgs<ExtArgs>
  }
  export type CargoRequestStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | CargoRequestDefaultArgs<ExtArgs>
  }

  export type $CargoRequestStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CargoRequestStatusHistory"
    objects: {
      request: Prisma.$CargoRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.CargoRequestStatus
      comment: string | null
      createdAt: Date
      requestId: string
    }, ExtArgs["result"]["cargoRequestStatusHistory"]>
    composites: {}
  }

  type CargoRequestStatusHistoryGetPayload<S extends boolean | null | undefined | CargoRequestStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload, S>

  type CargoRequestStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CargoRequestStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CargoRequestStatusHistoryCountAggregateInputType | true
    }

  export interface CargoRequestStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CargoRequestStatusHistory'], meta: { name: 'CargoRequestStatusHistory' } }
    /**
     * Find zero or one CargoRequestStatusHistory that matches the filter.
     * @param {CargoRequestStatusHistoryFindUniqueArgs} args - Arguments to find a CargoRequestStatusHistory
     * @example
     * // Get one CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CargoRequestStatusHistoryFindUniqueArgs>(args: SelectSubset<T, CargoRequestStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CargoRequestStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CargoRequestStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a CargoRequestStatusHistory
     * @example
     * // Get one CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CargoRequestStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CargoRequestStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CargoRequestStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryFindFirstArgs} args - Arguments to find a CargoRequestStatusHistory
     * @example
     * // Get one CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CargoRequestStatusHistoryFindFirstArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CargoRequestStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a CargoRequestStatusHistory
     * @example
     * // Get one CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CargoRequestStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CargoRequestStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CargoRequestStatusHistories
     * const cargoRequestStatusHistories = await prisma.cargoRequestStatusHistory.findMany()
     * 
     * // Get first 10 CargoRequestStatusHistories
     * const cargoRequestStatusHistories = await prisma.cargoRequestStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cargoRequestStatusHistoryWithIdOnly = await prisma.cargoRequestStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CargoRequestStatusHistoryFindManyArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CargoRequestStatusHistory.
     * @param {CargoRequestStatusHistoryCreateArgs} args - Arguments to create a CargoRequestStatusHistory.
     * @example
     * // Create one CargoRequestStatusHistory
     * const CargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.create({
     *   data: {
     *     // ... data to create a CargoRequestStatusHistory
     *   }
     * })
     * 
     */
    create<T extends CargoRequestStatusHistoryCreateArgs>(args: SelectSubset<T, CargoRequestStatusHistoryCreateArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CargoRequestStatusHistories.
     * @param {CargoRequestStatusHistoryCreateManyArgs} args - Arguments to create many CargoRequestStatusHistories.
     * @example
     * // Create many CargoRequestStatusHistories
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CargoRequestStatusHistoryCreateManyArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CargoRequestStatusHistories and returns the data saved in the database.
     * @param {CargoRequestStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many CargoRequestStatusHistories.
     * @example
     * // Create many CargoRequestStatusHistories
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CargoRequestStatusHistories and only return the `id`
     * const cargoRequestStatusHistoryWithIdOnly = await prisma.cargoRequestStatusHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CargoRequestStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CargoRequestStatusHistory.
     * @param {CargoRequestStatusHistoryDeleteArgs} args - Arguments to delete one CargoRequestStatusHistory.
     * @example
     * // Delete one CargoRequestStatusHistory
     * const CargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one CargoRequestStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends CargoRequestStatusHistoryDeleteArgs>(args: SelectSubset<T, CargoRequestStatusHistoryDeleteArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CargoRequestStatusHistory.
     * @param {CargoRequestStatusHistoryUpdateArgs} args - Arguments to update one CargoRequestStatusHistory.
     * @example
     * // Update one CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CargoRequestStatusHistoryUpdateArgs>(args: SelectSubset<T, CargoRequestStatusHistoryUpdateArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CargoRequestStatusHistories.
     * @param {CargoRequestStatusHistoryDeleteManyArgs} args - Arguments to filter CargoRequestStatusHistories to delete.
     * @example
     * // Delete a few CargoRequestStatusHistories
     * const { count } = await prisma.cargoRequestStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CargoRequestStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, CargoRequestStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CargoRequestStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CargoRequestStatusHistories
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CargoRequestStatusHistoryUpdateManyArgs>(args: SelectSubset<T, CargoRequestStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CargoRequestStatusHistory.
     * @param {CargoRequestStatusHistoryUpsertArgs} args - Arguments to update or create a CargoRequestStatusHistory.
     * @example
     * // Update or create a CargoRequestStatusHistory
     * const cargoRequestStatusHistory = await prisma.cargoRequestStatusHistory.upsert({
     *   create: {
     *     // ... data to create a CargoRequestStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CargoRequestStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends CargoRequestStatusHistoryUpsertArgs>(args: SelectSubset<T, CargoRequestStatusHistoryUpsertArgs<ExtArgs>>): Prisma__CargoRequestStatusHistoryClient<$Result.GetResult<Prisma.$CargoRequestStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CargoRequestStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryCountArgs} args - Arguments to filter CargoRequestStatusHistories to count.
     * @example
     * // Count the number of CargoRequestStatusHistories
     * const count = await prisma.cargoRequestStatusHistory.count({
     *   where: {
     *     // ... the filter for the CargoRequestStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends CargoRequestStatusHistoryCountArgs>(
      args?: Subset<T, CargoRequestStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CargoRequestStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CargoRequestStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CargoRequestStatusHistoryAggregateArgs>(args: Subset<T, CargoRequestStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetCargoRequestStatusHistoryAggregateType<T>>

    /**
     * Group by CargoRequestStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoRequestStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CargoRequestStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CargoRequestStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: CargoRequestStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CargoRequestStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCargoRequestStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CargoRequestStatusHistory model
   */
  readonly fields: CargoRequestStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CargoRequestStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CargoRequestStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends CargoRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CargoRequestDefaultArgs<ExtArgs>>): Prisma__CargoRequestClient<$Result.GetResult<Prisma.$CargoRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CargoRequestStatusHistory model
   */ 
  interface CargoRequestStatusHistoryFieldRefs {
    readonly id: FieldRef<"CargoRequestStatusHistory", 'String'>
    readonly status: FieldRef<"CargoRequestStatusHistory", 'CargoRequestStatus'>
    readonly comment: FieldRef<"CargoRequestStatusHistory", 'String'>
    readonly createdAt: FieldRef<"CargoRequestStatusHistory", 'DateTime'>
    readonly requestId: FieldRef<"CargoRequestStatusHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CargoRequestStatusHistory findUnique
   */
  export type CargoRequestStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequestStatusHistory to fetch.
     */
    where: CargoRequestStatusHistoryWhereUniqueInput
  }

  /**
   * CargoRequestStatusHistory findUniqueOrThrow
   */
  export type CargoRequestStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequestStatusHistory to fetch.
     */
    where: CargoRequestStatusHistoryWhereUniqueInput
  }

  /**
   * CargoRequestStatusHistory findFirst
   */
  export type CargoRequestStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequestStatusHistory to fetch.
     */
    where?: CargoRequestStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequestStatusHistories to fetch.
     */
    orderBy?: CargoRequestStatusHistoryOrderByWithRelationInput | CargoRequestStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoRequestStatusHistories.
     */
    cursor?: CargoRequestStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequestStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequestStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoRequestStatusHistories.
     */
    distinct?: CargoRequestStatusHistoryScalarFieldEnum | CargoRequestStatusHistoryScalarFieldEnum[]
  }

  /**
   * CargoRequestStatusHistory findFirstOrThrow
   */
  export type CargoRequestStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequestStatusHistory to fetch.
     */
    where?: CargoRequestStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequestStatusHistories to fetch.
     */
    orderBy?: CargoRequestStatusHistoryOrderByWithRelationInput | CargoRequestStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoRequestStatusHistories.
     */
    cursor?: CargoRequestStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequestStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequestStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoRequestStatusHistories.
     */
    distinct?: CargoRequestStatusHistoryScalarFieldEnum | CargoRequestStatusHistoryScalarFieldEnum[]
  }

  /**
   * CargoRequestStatusHistory findMany
   */
  export type CargoRequestStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CargoRequestStatusHistories to fetch.
     */
    where?: CargoRequestStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoRequestStatusHistories to fetch.
     */
    orderBy?: CargoRequestStatusHistoryOrderByWithRelationInput | CargoRequestStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CargoRequestStatusHistories.
     */
    cursor?: CargoRequestStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoRequestStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoRequestStatusHistories.
     */
    skip?: number
    distinct?: CargoRequestStatusHistoryScalarFieldEnum | CargoRequestStatusHistoryScalarFieldEnum[]
  }

  /**
   * CargoRequestStatusHistory create
   */
  export type CargoRequestStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a CargoRequestStatusHistory.
     */
    data: XOR<CargoRequestStatusHistoryCreateInput, CargoRequestStatusHistoryUncheckedCreateInput>
  }

  /**
   * CargoRequestStatusHistory createMany
   */
  export type CargoRequestStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CargoRequestStatusHistories.
     */
    data: CargoRequestStatusHistoryCreateManyInput | CargoRequestStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CargoRequestStatusHistory createManyAndReturn
   */
  export type CargoRequestStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CargoRequestStatusHistories.
     */
    data: CargoRequestStatusHistoryCreateManyInput | CargoRequestStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CargoRequestStatusHistory update
   */
  export type CargoRequestStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a CargoRequestStatusHistory.
     */
    data: XOR<CargoRequestStatusHistoryUpdateInput, CargoRequestStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which CargoRequestStatusHistory to update.
     */
    where: CargoRequestStatusHistoryWhereUniqueInput
  }

  /**
   * CargoRequestStatusHistory updateMany
   */
  export type CargoRequestStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CargoRequestStatusHistories.
     */
    data: XOR<CargoRequestStatusHistoryUpdateManyMutationInput, CargoRequestStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which CargoRequestStatusHistories to update
     */
    where?: CargoRequestStatusHistoryWhereInput
  }

  /**
   * CargoRequestStatusHistory upsert
   */
  export type CargoRequestStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the CargoRequestStatusHistory to update in case it exists.
     */
    where: CargoRequestStatusHistoryWhereUniqueInput
    /**
     * In case the CargoRequestStatusHistory found by the `where` argument doesn't exist, create a new CargoRequestStatusHistory with this data.
     */
    create: XOR<CargoRequestStatusHistoryCreateInput, CargoRequestStatusHistoryUncheckedCreateInput>
    /**
     * In case the CargoRequestStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CargoRequestStatusHistoryUpdateInput, CargoRequestStatusHistoryUncheckedUpdateInput>
  }

  /**
   * CargoRequestStatusHistory delete
   */
  export type CargoRequestStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which CargoRequestStatusHistory to delete.
     */
    where: CargoRequestStatusHistoryWhereUniqueInput
  }

  /**
   * CargoRequestStatusHistory deleteMany
   */
  export type CargoRequestStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoRequestStatusHistories to delete
     */
    where?: CargoRequestStatusHistoryWhereInput
  }

  /**
   * CargoRequestStatusHistory without action
   */
  export type CargoRequestStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoRequestStatusHistory
     */
    select?: CargoRequestStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoRequestStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Tariff
   */

  export type AggregateTariff = {
    _count: TariffCountAggregateOutputType | null
    _avg: TariffAvgAggregateOutputType | null
    _sum: TariffSumAggregateOutputType | null
    _min: TariffMinAggregateOutputType | null
    _max: TariffMaxAggregateOutputType | null
  }

  export type TariffAvgAggregateOutputType = {
    baseRate: number | null
    weightRate: number | null
    volumeRate: number | null
    distanceRate: number | null
  }

  export type TariffSumAggregateOutputType = {
    baseRate: number | null
    weightRate: number | null
    volumeRate: number | null
    distanceRate: number | null
  }

  export type TariffMinAggregateOutputType = {
    id: string | null
    name: string | null
    baseRate: number | null
    weightRate: number | null
    volumeRate: number | null
    distanceRate: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TariffMaxAggregateOutputType = {
    id: string | null
    name: string | null
    baseRate: number | null
    weightRate: number | null
    volumeRate: number | null
    distanceRate: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TariffCountAggregateOutputType = {
    id: number
    name: number
    baseRate: number
    weightRate: number
    volumeRate: number
    distanceRate: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TariffAvgAggregateInputType = {
    baseRate?: true
    weightRate?: true
    volumeRate?: true
    distanceRate?: true
  }

  export type TariffSumAggregateInputType = {
    baseRate?: true
    weightRate?: true
    volumeRate?: true
    distanceRate?: true
  }

  export type TariffMinAggregateInputType = {
    id?: true
    name?: true
    baseRate?: true
    weightRate?: true
    volumeRate?: true
    distanceRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TariffMaxAggregateInputType = {
    id?: true
    name?: true
    baseRate?: true
    weightRate?: true
    volumeRate?: true
    distanceRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TariffCountAggregateInputType = {
    id?: true
    name?: true
    baseRate?: true
    weightRate?: true
    volumeRate?: true
    distanceRate?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TariffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tariff to aggregate.
     */
    where?: TariffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tariffs to fetch.
     */
    orderBy?: TariffOrderByWithRelationInput | TariffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TariffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tariffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tariffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tariffs
    **/
    _count?: true | TariffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TariffAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TariffSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TariffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TariffMaxAggregateInputType
  }

  export type GetTariffAggregateType<T extends TariffAggregateArgs> = {
        [P in keyof T & keyof AggregateTariff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTariff[P]>
      : GetScalarType<T[P], AggregateTariff[P]>
  }




  export type TariffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TariffWhereInput
    orderBy?: TariffOrderByWithAggregationInput | TariffOrderByWithAggregationInput[]
    by: TariffScalarFieldEnum[] | TariffScalarFieldEnum
    having?: TariffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TariffCountAggregateInputType | true
    _avg?: TariffAvgAggregateInputType
    _sum?: TariffSumAggregateInputType
    _min?: TariffMinAggregateInputType
    _max?: TariffMaxAggregateInputType
  }

  export type TariffGroupByOutputType = {
    id: string
    name: string
    baseRate: number
    weightRate: number
    volumeRate: number
    distanceRate: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TariffCountAggregateOutputType | null
    _avg: TariffAvgAggregateOutputType | null
    _sum: TariffSumAggregateOutputType | null
    _min: TariffMinAggregateOutputType | null
    _max: TariffMaxAggregateOutputType | null
  }

  type GetTariffGroupByPayload<T extends TariffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TariffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TariffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TariffGroupByOutputType[P]>
            : GetScalarType<T[P], TariffGroupByOutputType[P]>
        }
      >
    >


  export type TariffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    baseRate?: boolean
    weightRate?: boolean
    volumeRate?: boolean
    distanceRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tariff"]>

  export type TariffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    baseRate?: boolean
    weightRate?: boolean
    volumeRate?: boolean
    distanceRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tariff"]>

  export type TariffSelectScalar = {
    id?: boolean
    name?: boolean
    baseRate?: boolean
    weightRate?: boolean
    volumeRate?: boolean
    distanceRate?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $TariffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tariff"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      baseRate: number
      weightRate: number
      volumeRate: number
      distanceRate: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tariff"]>
    composites: {}
  }

  type TariffGetPayload<S extends boolean | null | undefined | TariffDefaultArgs> = $Result.GetResult<Prisma.$TariffPayload, S>

  type TariffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TariffFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TariffCountAggregateInputType | true
    }

  export interface TariffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tariff'], meta: { name: 'Tariff' } }
    /**
     * Find zero or one Tariff that matches the filter.
     * @param {TariffFindUniqueArgs} args - Arguments to find a Tariff
     * @example
     * // Get one Tariff
     * const tariff = await prisma.tariff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TariffFindUniqueArgs>(args: SelectSubset<T, TariffFindUniqueArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tariff that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TariffFindUniqueOrThrowArgs} args - Arguments to find a Tariff
     * @example
     * // Get one Tariff
     * const tariff = await prisma.tariff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TariffFindUniqueOrThrowArgs>(args: SelectSubset<T, TariffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tariff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffFindFirstArgs} args - Arguments to find a Tariff
     * @example
     * // Get one Tariff
     * const tariff = await prisma.tariff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TariffFindFirstArgs>(args?: SelectSubset<T, TariffFindFirstArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tariff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffFindFirstOrThrowArgs} args - Arguments to find a Tariff
     * @example
     * // Get one Tariff
     * const tariff = await prisma.tariff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TariffFindFirstOrThrowArgs>(args?: SelectSubset<T, TariffFindFirstOrThrowArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tariffs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tariffs
     * const tariffs = await prisma.tariff.findMany()
     * 
     * // Get first 10 Tariffs
     * const tariffs = await prisma.tariff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tariffWithIdOnly = await prisma.tariff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TariffFindManyArgs>(args?: SelectSubset<T, TariffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tariff.
     * @param {TariffCreateArgs} args - Arguments to create a Tariff.
     * @example
     * // Create one Tariff
     * const Tariff = await prisma.tariff.create({
     *   data: {
     *     // ... data to create a Tariff
     *   }
     * })
     * 
     */
    create<T extends TariffCreateArgs>(args: SelectSubset<T, TariffCreateArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tariffs.
     * @param {TariffCreateManyArgs} args - Arguments to create many Tariffs.
     * @example
     * // Create many Tariffs
     * const tariff = await prisma.tariff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TariffCreateManyArgs>(args?: SelectSubset<T, TariffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tariffs and returns the data saved in the database.
     * @param {TariffCreateManyAndReturnArgs} args - Arguments to create many Tariffs.
     * @example
     * // Create many Tariffs
     * const tariff = await prisma.tariff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tariffs and only return the `id`
     * const tariffWithIdOnly = await prisma.tariff.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TariffCreateManyAndReturnArgs>(args?: SelectSubset<T, TariffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tariff.
     * @param {TariffDeleteArgs} args - Arguments to delete one Tariff.
     * @example
     * // Delete one Tariff
     * const Tariff = await prisma.tariff.delete({
     *   where: {
     *     // ... filter to delete one Tariff
     *   }
     * })
     * 
     */
    delete<T extends TariffDeleteArgs>(args: SelectSubset<T, TariffDeleteArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tariff.
     * @param {TariffUpdateArgs} args - Arguments to update one Tariff.
     * @example
     * // Update one Tariff
     * const tariff = await prisma.tariff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TariffUpdateArgs>(args: SelectSubset<T, TariffUpdateArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tariffs.
     * @param {TariffDeleteManyArgs} args - Arguments to filter Tariffs to delete.
     * @example
     * // Delete a few Tariffs
     * const { count } = await prisma.tariff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TariffDeleteManyArgs>(args?: SelectSubset<T, TariffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tariffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tariffs
     * const tariff = await prisma.tariff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TariffUpdateManyArgs>(args: SelectSubset<T, TariffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tariff.
     * @param {TariffUpsertArgs} args - Arguments to update or create a Tariff.
     * @example
     * // Update or create a Tariff
     * const tariff = await prisma.tariff.upsert({
     *   create: {
     *     // ... data to create a Tariff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tariff we want to update
     *   }
     * })
     */
    upsert<T extends TariffUpsertArgs>(args: SelectSubset<T, TariffUpsertArgs<ExtArgs>>): Prisma__TariffClient<$Result.GetResult<Prisma.$TariffPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tariffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffCountArgs} args - Arguments to filter Tariffs to count.
     * @example
     * // Count the number of Tariffs
     * const count = await prisma.tariff.count({
     *   where: {
     *     // ... the filter for the Tariffs we want to count
     *   }
     * })
    **/
    count<T extends TariffCountArgs>(
      args?: Subset<T, TariffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TariffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tariff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TariffAggregateArgs>(args: Subset<T, TariffAggregateArgs>): Prisma.PrismaPromise<GetTariffAggregateType<T>>

    /**
     * Group by Tariff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TariffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TariffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TariffGroupByArgs['orderBy'] }
        : { orderBy?: TariffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TariffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTariffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tariff model
   */
  readonly fields: TariffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tariff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TariffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tariff model
   */ 
  interface TariffFieldRefs {
    readonly id: FieldRef<"Tariff", 'String'>
    readonly name: FieldRef<"Tariff", 'String'>
    readonly baseRate: FieldRef<"Tariff", 'Float'>
    readonly weightRate: FieldRef<"Tariff", 'Float'>
    readonly volumeRate: FieldRef<"Tariff", 'Float'>
    readonly distanceRate: FieldRef<"Tariff", 'Float'>
    readonly isActive: FieldRef<"Tariff", 'Boolean'>
    readonly createdAt: FieldRef<"Tariff", 'DateTime'>
    readonly updatedAt: FieldRef<"Tariff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tariff findUnique
   */
  export type TariffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter, which Tariff to fetch.
     */
    where: TariffWhereUniqueInput
  }

  /**
   * Tariff findUniqueOrThrow
   */
  export type TariffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter, which Tariff to fetch.
     */
    where: TariffWhereUniqueInput
  }

  /**
   * Tariff findFirst
   */
  export type TariffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter, which Tariff to fetch.
     */
    where?: TariffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tariffs to fetch.
     */
    orderBy?: TariffOrderByWithRelationInput | TariffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tariffs.
     */
    cursor?: TariffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tariffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tariffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tariffs.
     */
    distinct?: TariffScalarFieldEnum | TariffScalarFieldEnum[]
  }

  /**
   * Tariff findFirstOrThrow
   */
  export type TariffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter, which Tariff to fetch.
     */
    where?: TariffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tariffs to fetch.
     */
    orderBy?: TariffOrderByWithRelationInput | TariffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tariffs.
     */
    cursor?: TariffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tariffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tariffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tariffs.
     */
    distinct?: TariffScalarFieldEnum | TariffScalarFieldEnum[]
  }

  /**
   * Tariff findMany
   */
  export type TariffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter, which Tariffs to fetch.
     */
    where?: TariffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tariffs to fetch.
     */
    orderBy?: TariffOrderByWithRelationInput | TariffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tariffs.
     */
    cursor?: TariffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tariffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tariffs.
     */
    skip?: number
    distinct?: TariffScalarFieldEnum | TariffScalarFieldEnum[]
  }

  /**
   * Tariff create
   */
  export type TariffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * The data needed to create a Tariff.
     */
    data: XOR<TariffCreateInput, TariffUncheckedCreateInput>
  }

  /**
   * Tariff createMany
   */
  export type TariffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tariffs.
     */
    data: TariffCreateManyInput | TariffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tariff createManyAndReturn
   */
  export type TariffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tariffs.
     */
    data: TariffCreateManyInput | TariffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tariff update
   */
  export type TariffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * The data needed to update a Tariff.
     */
    data: XOR<TariffUpdateInput, TariffUncheckedUpdateInput>
    /**
     * Choose, which Tariff to update.
     */
    where: TariffWhereUniqueInput
  }

  /**
   * Tariff updateMany
   */
  export type TariffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tariffs.
     */
    data: XOR<TariffUpdateManyMutationInput, TariffUncheckedUpdateManyInput>
    /**
     * Filter which Tariffs to update
     */
    where?: TariffWhereInput
  }

  /**
   * Tariff upsert
   */
  export type TariffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * The filter to search for the Tariff to update in case it exists.
     */
    where: TariffWhereUniqueInput
    /**
     * In case the Tariff found by the `where` argument doesn't exist, create a new Tariff with this data.
     */
    create: XOR<TariffCreateInput, TariffUncheckedCreateInput>
    /**
     * In case the Tariff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TariffUpdateInput, TariffUncheckedUpdateInput>
  }

  /**
   * Tariff delete
   */
  export type TariffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
    /**
     * Filter which Tariff to delete.
     */
    where: TariffWhereUniqueInput
  }

  /**
   * Tariff deleteMany
   */
  export type TariffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tariffs to delete
     */
    where?: TariffWhereInput
  }

  /**
   * Tariff without action
   */
  export type TariffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tariff
     */
    select?: TariffSelect<ExtArgs> | null
  }


  /**
   * Model VehicleType
   */

  export type AggregateVehicleType = {
    _count: VehicleTypeCountAggregateOutputType | null
    _avg: VehicleTypeAvgAggregateOutputType | null
    _sum: VehicleTypeSumAggregateOutputType | null
    _min: VehicleTypeMinAggregateOutputType | null
    _max: VehicleTypeMaxAggregateOutputType | null
  }

  export type VehicleTypeAvgAggregateOutputType = {
    maxWeight: number | null
    maxVolume: number | null
  }

  export type VehicleTypeSumAggregateOutputType = {
    maxWeight: number | null
    maxVolume: number | null
  }

  export type VehicleTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    maxWeight: number | null
    maxVolume: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    maxWeight: number | null
    maxVolume: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleTypeCountAggregateOutputType = {
    id: number
    name: number
    maxWeight: number
    maxVolume: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleTypeAvgAggregateInputType = {
    maxWeight?: true
    maxVolume?: true
  }

  export type VehicleTypeSumAggregateInputType = {
    maxWeight?: true
    maxVolume?: true
  }

  export type VehicleTypeMinAggregateInputType = {
    id?: true
    name?: true
    maxWeight?: true
    maxVolume?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleTypeMaxAggregateInputType = {
    id?: true
    name?: true
    maxWeight?: true
    maxVolume?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleTypeCountAggregateInputType = {
    id?: true
    name?: true
    maxWeight?: true
    maxVolume?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleType to aggregate.
     */
    where?: VehicleTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleTypes to fetch.
     */
    orderBy?: VehicleTypeOrderByWithRelationInput | VehicleTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleTypes
    **/
    _count?: true | VehicleTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleTypeMaxAggregateInputType
  }

  export type GetVehicleTypeAggregateType<T extends VehicleTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleType[P]>
      : GetScalarType<T[P], AggregateVehicleType[P]>
  }




  export type VehicleTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleTypeWhereInput
    orderBy?: VehicleTypeOrderByWithAggregationInput | VehicleTypeOrderByWithAggregationInput[]
    by: VehicleTypeScalarFieldEnum[] | VehicleTypeScalarFieldEnum
    having?: VehicleTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleTypeCountAggregateInputType | true
    _avg?: VehicleTypeAvgAggregateInputType
    _sum?: VehicleTypeSumAggregateInputType
    _min?: VehicleTypeMinAggregateInputType
    _max?: VehicleTypeMaxAggregateInputType
  }

  export type VehicleTypeGroupByOutputType = {
    id: string
    name: string
    maxWeight: number
    maxVolume: number
    createdAt: Date
    updatedAt: Date
    _count: VehicleTypeCountAggregateOutputType | null
    _avg: VehicleTypeAvgAggregateOutputType | null
    _sum: VehicleTypeSumAggregateOutputType | null
    _min: VehicleTypeMinAggregateOutputType | null
    _max: VehicleTypeMaxAggregateOutputType | null
  }

  type GetVehicleTypeGroupByPayload<T extends VehicleTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleTypeGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleTypeGroupByOutputType[P]>
        }
      >
    >


  export type VehicleTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    maxWeight?: boolean
    maxVolume?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicleType"]>

  export type VehicleTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    maxWeight?: boolean
    maxVolume?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicleType"]>

  export type VehicleTypeSelectScalar = {
    id?: boolean
    name?: boolean
    maxWeight?: boolean
    maxVolume?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VehicleTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      maxWeight: number
      maxVolume: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicleType"]>
    composites: {}
  }

  type VehicleTypeGetPayload<S extends boolean | null | undefined | VehicleTypeDefaultArgs> = $Result.GetResult<Prisma.$VehicleTypePayload, S>

  type VehicleTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VehicleTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VehicleTypeCountAggregateInputType | true
    }

  export interface VehicleTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleType'], meta: { name: 'VehicleType' } }
    /**
     * Find zero or one VehicleType that matches the filter.
     * @param {VehicleTypeFindUniqueArgs} args - Arguments to find a VehicleType
     * @example
     * // Get one VehicleType
     * const vehicleType = await prisma.vehicleType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleTypeFindUniqueArgs>(args: SelectSubset<T, VehicleTypeFindUniqueArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VehicleType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VehicleTypeFindUniqueOrThrowArgs} args - Arguments to find a VehicleType
     * @example
     * // Get one VehicleType
     * const vehicleType = await prisma.vehicleType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VehicleType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeFindFirstArgs} args - Arguments to find a VehicleType
     * @example
     * // Get one VehicleType
     * const vehicleType = await prisma.vehicleType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleTypeFindFirstArgs>(args?: SelectSubset<T, VehicleTypeFindFirstArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VehicleType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeFindFirstOrThrowArgs} args - Arguments to find a VehicleType
     * @example
     * // Get one VehicleType
     * const vehicleType = await prisma.vehicleType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VehicleTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleTypes
     * const vehicleTypes = await prisma.vehicleType.findMany()
     * 
     * // Get first 10 VehicleTypes
     * const vehicleTypes = await prisma.vehicleType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleTypeWithIdOnly = await prisma.vehicleType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleTypeFindManyArgs>(args?: SelectSubset<T, VehicleTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VehicleType.
     * @param {VehicleTypeCreateArgs} args - Arguments to create a VehicleType.
     * @example
     * // Create one VehicleType
     * const VehicleType = await prisma.vehicleType.create({
     *   data: {
     *     // ... data to create a VehicleType
     *   }
     * })
     * 
     */
    create<T extends VehicleTypeCreateArgs>(args: SelectSubset<T, VehicleTypeCreateArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VehicleTypes.
     * @param {VehicleTypeCreateManyArgs} args - Arguments to create many VehicleTypes.
     * @example
     * // Create many VehicleTypes
     * const vehicleType = await prisma.vehicleType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleTypeCreateManyArgs>(args?: SelectSubset<T, VehicleTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleTypes and returns the data saved in the database.
     * @param {VehicleTypeCreateManyAndReturnArgs} args - Arguments to create many VehicleTypes.
     * @example
     * // Create many VehicleTypes
     * const vehicleType = await prisma.vehicleType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleTypes and only return the `id`
     * const vehicleTypeWithIdOnly = await prisma.vehicleType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VehicleType.
     * @param {VehicleTypeDeleteArgs} args - Arguments to delete one VehicleType.
     * @example
     * // Delete one VehicleType
     * const VehicleType = await prisma.vehicleType.delete({
     *   where: {
     *     // ... filter to delete one VehicleType
     *   }
     * })
     * 
     */
    delete<T extends VehicleTypeDeleteArgs>(args: SelectSubset<T, VehicleTypeDeleteArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VehicleType.
     * @param {VehicleTypeUpdateArgs} args - Arguments to update one VehicleType.
     * @example
     * // Update one VehicleType
     * const vehicleType = await prisma.vehicleType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleTypeUpdateArgs>(args: SelectSubset<T, VehicleTypeUpdateArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VehicleTypes.
     * @param {VehicleTypeDeleteManyArgs} args - Arguments to filter VehicleTypes to delete.
     * @example
     * // Delete a few VehicleTypes
     * const { count } = await prisma.vehicleType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleTypeDeleteManyArgs>(args?: SelectSubset<T, VehicleTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleTypes
     * const vehicleType = await prisma.vehicleType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleTypeUpdateManyArgs>(args: SelectSubset<T, VehicleTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VehicleType.
     * @param {VehicleTypeUpsertArgs} args - Arguments to update or create a VehicleType.
     * @example
     * // Update or create a VehicleType
     * const vehicleType = await prisma.vehicleType.upsert({
     *   create: {
     *     // ... data to create a VehicleType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleType we want to update
     *   }
     * })
     */
    upsert<T extends VehicleTypeUpsertArgs>(args: SelectSubset<T, VehicleTypeUpsertArgs<ExtArgs>>): Prisma__VehicleTypeClient<$Result.GetResult<Prisma.$VehicleTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VehicleTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeCountArgs} args - Arguments to filter VehicleTypes to count.
     * @example
     * // Count the number of VehicleTypes
     * const count = await prisma.vehicleType.count({
     *   where: {
     *     // ... the filter for the VehicleTypes we want to count
     *   }
     * })
    **/
    count<T extends VehicleTypeCountArgs>(
      args?: Subset<T, VehicleTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleTypeAggregateArgs>(args: Subset<T, VehicleTypeAggregateArgs>): Prisma.PrismaPromise<GetVehicleTypeAggregateType<T>>

    /**
     * Group by VehicleType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleTypeGroupByArgs['orderBy'] }
        : { orderBy?: VehicleTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleType model
   */
  readonly fields: VehicleTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleType model
   */ 
  interface VehicleTypeFieldRefs {
    readonly id: FieldRef<"VehicleType", 'String'>
    readonly name: FieldRef<"VehicleType", 'String'>
    readonly maxWeight: FieldRef<"VehicleType", 'Float'>
    readonly maxVolume: FieldRef<"VehicleType", 'Float'>
    readonly createdAt: FieldRef<"VehicleType", 'DateTime'>
    readonly updatedAt: FieldRef<"VehicleType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehicleType findUnique
   */
  export type VehicleTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter, which VehicleType to fetch.
     */
    where: VehicleTypeWhereUniqueInput
  }

  /**
   * VehicleType findUniqueOrThrow
   */
  export type VehicleTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter, which VehicleType to fetch.
     */
    where: VehicleTypeWhereUniqueInput
  }

  /**
   * VehicleType findFirst
   */
  export type VehicleTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter, which VehicleType to fetch.
     */
    where?: VehicleTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleTypes to fetch.
     */
    orderBy?: VehicleTypeOrderByWithRelationInput | VehicleTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleTypes.
     */
    cursor?: VehicleTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleTypes.
     */
    distinct?: VehicleTypeScalarFieldEnum | VehicleTypeScalarFieldEnum[]
  }

  /**
   * VehicleType findFirstOrThrow
   */
  export type VehicleTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter, which VehicleType to fetch.
     */
    where?: VehicleTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleTypes to fetch.
     */
    orderBy?: VehicleTypeOrderByWithRelationInput | VehicleTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleTypes.
     */
    cursor?: VehicleTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleTypes.
     */
    distinct?: VehicleTypeScalarFieldEnum | VehicleTypeScalarFieldEnum[]
  }

  /**
   * VehicleType findMany
   */
  export type VehicleTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter, which VehicleTypes to fetch.
     */
    where?: VehicleTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleTypes to fetch.
     */
    orderBy?: VehicleTypeOrderByWithRelationInput | VehicleTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleTypes.
     */
    cursor?: VehicleTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleTypes.
     */
    skip?: number
    distinct?: VehicleTypeScalarFieldEnum | VehicleTypeScalarFieldEnum[]
  }

  /**
   * VehicleType create
   */
  export type VehicleTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * The data needed to create a VehicleType.
     */
    data: XOR<VehicleTypeCreateInput, VehicleTypeUncheckedCreateInput>
  }

  /**
   * VehicleType createMany
   */
  export type VehicleTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleTypes.
     */
    data: VehicleTypeCreateManyInput | VehicleTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleType createManyAndReturn
   */
  export type VehicleTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VehicleTypes.
     */
    data: VehicleTypeCreateManyInput | VehicleTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleType update
   */
  export type VehicleTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * The data needed to update a VehicleType.
     */
    data: XOR<VehicleTypeUpdateInput, VehicleTypeUncheckedUpdateInput>
    /**
     * Choose, which VehicleType to update.
     */
    where: VehicleTypeWhereUniqueInput
  }

  /**
   * VehicleType updateMany
   */
  export type VehicleTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleTypes.
     */
    data: XOR<VehicleTypeUpdateManyMutationInput, VehicleTypeUncheckedUpdateManyInput>
    /**
     * Filter which VehicleTypes to update
     */
    where?: VehicleTypeWhereInput
  }

  /**
   * VehicleType upsert
   */
  export type VehicleTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * The filter to search for the VehicleType to update in case it exists.
     */
    where: VehicleTypeWhereUniqueInput
    /**
     * In case the VehicleType found by the `where` argument doesn't exist, create a new VehicleType with this data.
     */
    create: XOR<VehicleTypeCreateInput, VehicleTypeUncheckedCreateInput>
    /**
     * In case the VehicleType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleTypeUpdateInput, VehicleTypeUncheckedUpdateInput>
  }

  /**
   * VehicleType delete
   */
  export type VehicleTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
    /**
     * Filter which VehicleType to delete.
     */
    where: VehicleTypeWhereUniqueInput
  }

  /**
   * VehicleType deleteMany
   */
  export type VehicleTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleTypes to delete
     */
    where?: VehicleTypeWhereInput
  }

  /**
   * VehicleType without action
   */
  export type VehicleTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleType
     */
    select?: VehicleTypeSelect<ExtArgs> | null
  }


  /**
   * Model CargoType
   */

  export type AggregateCargoType = {
    _count: CargoTypeCountAggregateOutputType | null
    _min: CargoTypeMinAggregateOutputType | null
    _max: CargoTypeMaxAggregateOutputType | null
  }

  export type CargoTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CargoTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CargoTypeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CargoTypeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CargoTypeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CargoTypeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CargoTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoType to aggregate.
     */
    where?: CargoTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoTypes to fetch.
     */
    orderBy?: CargoTypeOrderByWithRelationInput | CargoTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CargoTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CargoTypes
    **/
    _count?: true | CargoTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CargoTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CargoTypeMaxAggregateInputType
  }

  export type GetCargoTypeAggregateType<T extends CargoTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateCargoType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCargoType[P]>
      : GetScalarType<T[P], AggregateCargoType[P]>
  }




  export type CargoTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoTypeWhereInput
    orderBy?: CargoTypeOrderByWithAggregationInput | CargoTypeOrderByWithAggregationInput[]
    by: CargoTypeScalarFieldEnum[] | CargoTypeScalarFieldEnum
    having?: CargoTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CargoTypeCountAggregateInputType | true
    _min?: CargoTypeMinAggregateInputType
    _max?: CargoTypeMaxAggregateInputType
  }

  export type CargoTypeGroupByOutputType = {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    _count: CargoTypeCountAggregateOutputType | null
    _min: CargoTypeMinAggregateOutputType | null
    _max: CargoTypeMaxAggregateOutputType | null
  }

  type GetCargoTypeGroupByPayload<T extends CargoTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CargoTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CargoTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CargoTypeGroupByOutputType[P]>
            : GetScalarType<T[P], CargoTypeGroupByOutputType[P]>
        }
      >
    >


  export type CargoTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cargoType"]>

  export type CargoTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cargoType"]>

  export type CargoTypeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CargoTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CargoType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cargoType"]>
    composites: {}
  }

  type CargoTypeGetPayload<S extends boolean | null | undefined | CargoTypeDefaultArgs> = $Result.GetResult<Prisma.$CargoTypePayload, S>

  type CargoTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CargoTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CargoTypeCountAggregateInputType | true
    }

  export interface CargoTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CargoType'], meta: { name: 'CargoType' } }
    /**
     * Find zero or one CargoType that matches the filter.
     * @param {CargoTypeFindUniqueArgs} args - Arguments to find a CargoType
     * @example
     * // Get one CargoType
     * const cargoType = await prisma.cargoType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CargoTypeFindUniqueArgs>(args: SelectSubset<T, CargoTypeFindUniqueArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CargoType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CargoTypeFindUniqueOrThrowArgs} args - Arguments to find a CargoType
     * @example
     * // Get one CargoType
     * const cargoType = await prisma.cargoType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CargoTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, CargoTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CargoType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeFindFirstArgs} args - Arguments to find a CargoType
     * @example
     * // Get one CargoType
     * const cargoType = await prisma.cargoType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CargoTypeFindFirstArgs>(args?: SelectSubset<T, CargoTypeFindFirstArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CargoType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeFindFirstOrThrowArgs} args - Arguments to find a CargoType
     * @example
     * // Get one CargoType
     * const cargoType = await prisma.cargoType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CargoTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, CargoTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CargoTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CargoTypes
     * const cargoTypes = await prisma.cargoType.findMany()
     * 
     * // Get first 10 CargoTypes
     * const cargoTypes = await prisma.cargoType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cargoTypeWithIdOnly = await prisma.cargoType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CargoTypeFindManyArgs>(args?: SelectSubset<T, CargoTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CargoType.
     * @param {CargoTypeCreateArgs} args - Arguments to create a CargoType.
     * @example
     * // Create one CargoType
     * const CargoType = await prisma.cargoType.create({
     *   data: {
     *     // ... data to create a CargoType
     *   }
     * })
     * 
     */
    create<T extends CargoTypeCreateArgs>(args: SelectSubset<T, CargoTypeCreateArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CargoTypes.
     * @param {CargoTypeCreateManyArgs} args - Arguments to create many CargoTypes.
     * @example
     * // Create many CargoTypes
     * const cargoType = await prisma.cargoType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CargoTypeCreateManyArgs>(args?: SelectSubset<T, CargoTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CargoTypes and returns the data saved in the database.
     * @param {CargoTypeCreateManyAndReturnArgs} args - Arguments to create many CargoTypes.
     * @example
     * // Create many CargoTypes
     * const cargoType = await prisma.cargoType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CargoTypes and only return the `id`
     * const cargoTypeWithIdOnly = await prisma.cargoType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CargoTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, CargoTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CargoType.
     * @param {CargoTypeDeleteArgs} args - Arguments to delete one CargoType.
     * @example
     * // Delete one CargoType
     * const CargoType = await prisma.cargoType.delete({
     *   where: {
     *     // ... filter to delete one CargoType
     *   }
     * })
     * 
     */
    delete<T extends CargoTypeDeleteArgs>(args: SelectSubset<T, CargoTypeDeleteArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CargoType.
     * @param {CargoTypeUpdateArgs} args - Arguments to update one CargoType.
     * @example
     * // Update one CargoType
     * const cargoType = await prisma.cargoType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CargoTypeUpdateArgs>(args: SelectSubset<T, CargoTypeUpdateArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CargoTypes.
     * @param {CargoTypeDeleteManyArgs} args - Arguments to filter CargoTypes to delete.
     * @example
     * // Delete a few CargoTypes
     * const { count } = await prisma.cargoType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CargoTypeDeleteManyArgs>(args?: SelectSubset<T, CargoTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CargoTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CargoTypes
     * const cargoType = await prisma.cargoType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CargoTypeUpdateManyArgs>(args: SelectSubset<T, CargoTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CargoType.
     * @param {CargoTypeUpsertArgs} args - Arguments to update or create a CargoType.
     * @example
     * // Update or create a CargoType
     * const cargoType = await prisma.cargoType.upsert({
     *   create: {
     *     // ... data to create a CargoType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CargoType we want to update
     *   }
     * })
     */
    upsert<T extends CargoTypeUpsertArgs>(args: SelectSubset<T, CargoTypeUpsertArgs<ExtArgs>>): Prisma__CargoTypeClient<$Result.GetResult<Prisma.$CargoTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CargoTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeCountArgs} args - Arguments to filter CargoTypes to count.
     * @example
     * // Count the number of CargoTypes
     * const count = await prisma.cargoType.count({
     *   where: {
     *     // ... the filter for the CargoTypes we want to count
     *   }
     * })
    **/
    count<T extends CargoTypeCountArgs>(
      args?: Subset<T, CargoTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CargoTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CargoType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CargoTypeAggregateArgs>(args: Subset<T, CargoTypeAggregateArgs>): Prisma.PrismaPromise<GetCargoTypeAggregateType<T>>

    /**
     * Group by CargoType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CargoTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CargoTypeGroupByArgs['orderBy'] }
        : { orderBy?: CargoTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CargoTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCargoTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CargoType model
   */
  readonly fields: CargoTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CargoType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CargoTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CargoType model
   */ 
  interface CargoTypeFieldRefs {
    readonly id: FieldRef<"CargoType", 'String'>
    readonly name: FieldRef<"CargoType", 'String'>
    readonly description: FieldRef<"CargoType", 'String'>
    readonly createdAt: FieldRef<"CargoType", 'DateTime'>
    readonly updatedAt: FieldRef<"CargoType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CargoType findUnique
   */
  export type CargoTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter, which CargoType to fetch.
     */
    where: CargoTypeWhereUniqueInput
  }

  /**
   * CargoType findUniqueOrThrow
   */
  export type CargoTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter, which CargoType to fetch.
     */
    where: CargoTypeWhereUniqueInput
  }

  /**
   * CargoType findFirst
   */
  export type CargoTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter, which CargoType to fetch.
     */
    where?: CargoTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoTypes to fetch.
     */
    orderBy?: CargoTypeOrderByWithRelationInput | CargoTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoTypes.
     */
    cursor?: CargoTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoTypes.
     */
    distinct?: CargoTypeScalarFieldEnum | CargoTypeScalarFieldEnum[]
  }

  /**
   * CargoType findFirstOrThrow
   */
  export type CargoTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter, which CargoType to fetch.
     */
    where?: CargoTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoTypes to fetch.
     */
    orderBy?: CargoTypeOrderByWithRelationInput | CargoTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoTypes.
     */
    cursor?: CargoTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoTypes.
     */
    distinct?: CargoTypeScalarFieldEnum | CargoTypeScalarFieldEnum[]
  }

  /**
   * CargoType findMany
   */
  export type CargoTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter, which CargoTypes to fetch.
     */
    where?: CargoTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoTypes to fetch.
     */
    orderBy?: CargoTypeOrderByWithRelationInput | CargoTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CargoTypes.
     */
    cursor?: CargoTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoTypes.
     */
    skip?: number
    distinct?: CargoTypeScalarFieldEnum | CargoTypeScalarFieldEnum[]
  }

  /**
   * CargoType create
   */
  export type CargoTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * The data needed to create a CargoType.
     */
    data: XOR<CargoTypeCreateInput, CargoTypeUncheckedCreateInput>
  }

  /**
   * CargoType createMany
   */
  export type CargoTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CargoTypes.
     */
    data: CargoTypeCreateManyInput | CargoTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CargoType createManyAndReturn
   */
  export type CargoTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CargoTypes.
     */
    data: CargoTypeCreateManyInput | CargoTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CargoType update
   */
  export type CargoTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * The data needed to update a CargoType.
     */
    data: XOR<CargoTypeUpdateInput, CargoTypeUncheckedUpdateInput>
    /**
     * Choose, which CargoType to update.
     */
    where: CargoTypeWhereUniqueInput
  }

  /**
   * CargoType updateMany
   */
  export type CargoTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CargoTypes.
     */
    data: XOR<CargoTypeUpdateManyMutationInput, CargoTypeUncheckedUpdateManyInput>
    /**
     * Filter which CargoTypes to update
     */
    where?: CargoTypeWhereInput
  }

  /**
   * CargoType upsert
   */
  export type CargoTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * The filter to search for the CargoType to update in case it exists.
     */
    where: CargoTypeWhereUniqueInput
    /**
     * In case the CargoType found by the `where` argument doesn't exist, create a new CargoType with this data.
     */
    create: XOR<CargoTypeCreateInput, CargoTypeUncheckedCreateInput>
    /**
     * In case the CargoType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CargoTypeUpdateInput, CargoTypeUncheckedUpdateInput>
  }

  /**
   * CargoType delete
   */
  export type CargoTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
    /**
     * Filter which CargoType to delete.
     */
    where: CargoTypeWhereUniqueInput
  }

  /**
   * CargoType deleteMany
   */
  export type CargoTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoTypes to delete
     */
    where?: CargoTypeWhereInput
  }

  /**
   * CargoType without action
   */
  export type CargoTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoType
     */
    select?: CargoTypeSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CargoRequestScalarFieldEnum: {
    id: 'id',
    cargoType: 'cargoType',
    weight: 'weight',
    volume: 'volume',
    from: 'from',
    to: 'to',
    distance: 'distance',
    vehicleType: 'vehicleType',
    name: 'name',
    email: 'email',
    phone: 'phone',
    status: 'status',
    cost: 'cost',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type CargoRequestScalarFieldEnum = (typeof CargoRequestScalarFieldEnum)[keyof typeof CargoRequestScalarFieldEnum]


  export const CargoRequestStatusHistoryScalarFieldEnum: {
    id: 'id',
    status: 'status',
    comment: 'comment',
    createdAt: 'createdAt',
    requestId: 'requestId'
  };

  export type CargoRequestStatusHistoryScalarFieldEnum = (typeof CargoRequestStatusHistoryScalarFieldEnum)[keyof typeof CargoRequestStatusHistoryScalarFieldEnum]


  export const TariffScalarFieldEnum: {
    id: 'id',
    name: 'name',
    baseRate: 'baseRate',
    weightRate: 'weightRate',
    volumeRate: 'volumeRate',
    distanceRate: 'distanceRate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TariffScalarFieldEnum = (typeof TariffScalarFieldEnum)[keyof typeof TariffScalarFieldEnum]


  export const VehicleTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    maxWeight: 'maxWeight',
    maxVolume: 'maxVolume',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleTypeScalarFieldEnum = (typeof VehicleTypeScalarFieldEnum)[keyof typeof VehicleTypeScalarFieldEnum]


  export const CargoTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CargoTypeScalarFieldEnum = (typeof CargoTypeScalarFieldEnum)[keyof typeof CargoTypeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CargoRequestStatus'
   */
  export type EnumCargoRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CargoRequestStatus'>
    


  /**
   * Reference to a field of type 'CargoRequestStatus[]'
   */
  export type ListEnumCargoRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CargoRequestStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    requests?: CargoRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    requests?: CargoRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    requests?: CargoRequestListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CargoRequestWhereInput = {
    AND?: CargoRequestWhereInput | CargoRequestWhereInput[]
    OR?: CargoRequestWhereInput[]
    NOT?: CargoRequestWhereInput | CargoRequestWhereInput[]
    id?: StringFilter<"CargoRequest"> | string
    cargoType?: StringFilter<"CargoRequest"> | string
    weight?: FloatFilter<"CargoRequest"> | number
    volume?: FloatFilter<"CargoRequest"> | number
    from?: StringFilter<"CargoRequest"> | string
    to?: StringFilter<"CargoRequest"> | string
    distance?: FloatNullableFilter<"CargoRequest"> | number | null
    vehicleType?: StringFilter<"CargoRequest"> | string
    name?: StringFilter<"CargoRequest"> | string
    email?: StringFilter<"CargoRequest"> | string
    phone?: StringFilter<"CargoRequest"> | string
    status?: EnumCargoRequestStatusFilter<"CargoRequest"> | $Enums.CargoRequestStatus
    cost?: FloatNullableFilter<"CargoRequest"> | number | null
    createdAt?: DateTimeFilter<"CargoRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CargoRequest"> | Date | string
    userId?: StringNullableFilter<"CargoRequest"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    statusHistory?: CargoRequestStatusHistoryListRelationFilter
  }

  export type CargoRequestOrderByWithRelationInput = {
    id?: SortOrder
    cargoType?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    from?: SortOrder
    to?: SortOrder
    distance?: SortOrderInput | SortOrder
    vehicleType?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    cost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    statusHistory?: CargoRequestStatusHistoryOrderByRelationAggregateInput
  }

  export type CargoRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CargoRequestWhereInput | CargoRequestWhereInput[]
    OR?: CargoRequestWhereInput[]
    NOT?: CargoRequestWhereInput | CargoRequestWhereInput[]
    cargoType?: StringFilter<"CargoRequest"> | string
    weight?: FloatFilter<"CargoRequest"> | number
    volume?: FloatFilter<"CargoRequest"> | number
    from?: StringFilter<"CargoRequest"> | string
    to?: StringFilter<"CargoRequest"> | string
    distance?: FloatNullableFilter<"CargoRequest"> | number | null
    vehicleType?: StringFilter<"CargoRequest"> | string
    name?: StringFilter<"CargoRequest"> | string
    email?: StringFilter<"CargoRequest"> | string
    phone?: StringFilter<"CargoRequest"> | string
    status?: EnumCargoRequestStatusFilter<"CargoRequest"> | $Enums.CargoRequestStatus
    cost?: FloatNullableFilter<"CargoRequest"> | number | null
    createdAt?: DateTimeFilter<"CargoRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CargoRequest"> | Date | string
    userId?: StringNullableFilter<"CargoRequest"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    statusHistory?: CargoRequestStatusHistoryListRelationFilter
  }, "id">

  export type CargoRequestOrderByWithAggregationInput = {
    id?: SortOrder
    cargoType?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    from?: SortOrder
    to?: SortOrder
    distance?: SortOrderInput | SortOrder
    vehicleType?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    cost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: CargoRequestCountOrderByAggregateInput
    _avg?: CargoRequestAvgOrderByAggregateInput
    _max?: CargoRequestMaxOrderByAggregateInput
    _min?: CargoRequestMinOrderByAggregateInput
    _sum?: CargoRequestSumOrderByAggregateInput
  }

  export type CargoRequestScalarWhereWithAggregatesInput = {
    AND?: CargoRequestScalarWhereWithAggregatesInput | CargoRequestScalarWhereWithAggregatesInput[]
    OR?: CargoRequestScalarWhereWithAggregatesInput[]
    NOT?: CargoRequestScalarWhereWithAggregatesInput | CargoRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CargoRequest"> | string
    cargoType?: StringWithAggregatesFilter<"CargoRequest"> | string
    weight?: FloatWithAggregatesFilter<"CargoRequest"> | number
    volume?: FloatWithAggregatesFilter<"CargoRequest"> | number
    from?: StringWithAggregatesFilter<"CargoRequest"> | string
    to?: StringWithAggregatesFilter<"CargoRequest"> | string
    distance?: FloatNullableWithAggregatesFilter<"CargoRequest"> | number | null
    vehicleType?: StringWithAggregatesFilter<"CargoRequest"> | string
    name?: StringWithAggregatesFilter<"CargoRequest"> | string
    email?: StringWithAggregatesFilter<"CargoRequest"> | string
    phone?: StringWithAggregatesFilter<"CargoRequest"> | string
    status?: EnumCargoRequestStatusWithAggregatesFilter<"CargoRequest"> | $Enums.CargoRequestStatus
    cost?: FloatNullableWithAggregatesFilter<"CargoRequest"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CargoRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CargoRequest"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"CargoRequest"> | string | null
  }

  export type CargoRequestStatusHistoryWhereInput = {
    AND?: CargoRequestStatusHistoryWhereInput | CargoRequestStatusHistoryWhereInput[]
    OR?: CargoRequestStatusHistoryWhereInput[]
    NOT?: CargoRequestStatusHistoryWhereInput | CargoRequestStatusHistoryWhereInput[]
    id?: StringFilter<"CargoRequestStatusHistory"> | string
    status?: EnumCargoRequestStatusFilter<"CargoRequestStatusHistory"> | $Enums.CargoRequestStatus
    comment?: StringNullableFilter<"CargoRequestStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"CargoRequestStatusHistory"> | Date | string
    requestId?: StringFilter<"CargoRequestStatusHistory"> | string
    request?: XOR<CargoRequestRelationFilter, CargoRequestWhereInput>
  }

  export type CargoRequestStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    requestId?: SortOrder
    request?: CargoRequestOrderByWithRelationInput
  }

  export type CargoRequestStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CargoRequestStatusHistoryWhereInput | CargoRequestStatusHistoryWhereInput[]
    OR?: CargoRequestStatusHistoryWhereInput[]
    NOT?: CargoRequestStatusHistoryWhereInput | CargoRequestStatusHistoryWhereInput[]
    status?: EnumCargoRequestStatusFilter<"CargoRequestStatusHistory"> | $Enums.CargoRequestStatus
    comment?: StringNullableFilter<"CargoRequestStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"CargoRequestStatusHistory"> | Date | string
    requestId?: StringFilter<"CargoRequestStatusHistory"> | string
    request?: XOR<CargoRequestRelationFilter, CargoRequestWhereInput>
  }, "id">

  export type CargoRequestStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    requestId?: SortOrder
    _count?: CargoRequestStatusHistoryCountOrderByAggregateInput
    _max?: CargoRequestStatusHistoryMaxOrderByAggregateInput
    _min?: CargoRequestStatusHistoryMinOrderByAggregateInput
  }

  export type CargoRequestStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: CargoRequestStatusHistoryScalarWhereWithAggregatesInput | CargoRequestStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: CargoRequestStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: CargoRequestStatusHistoryScalarWhereWithAggregatesInput | CargoRequestStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CargoRequestStatusHistory"> | string
    status?: EnumCargoRequestStatusWithAggregatesFilter<"CargoRequestStatusHistory"> | $Enums.CargoRequestStatus
    comment?: StringNullableWithAggregatesFilter<"CargoRequestStatusHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CargoRequestStatusHistory"> | Date | string
    requestId?: StringWithAggregatesFilter<"CargoRequestStatusHistory"> | string
  }

  export type TariffWhereInput = {
    AND?: TariffWhereInput | TariffWhereInput[]
    OR?: TariffWhereInput[]
    NOT?: TariffWhereInput | TariffWhereInput[]
    id?: StringFilter<"Tariff"> | string
    name?: StringFilter<"Tariff"> | string
    baseRate?: FloatFilter<"Tariff"> | number
    weightRate?: FloatFilter<"Tariff"> | number
    volumeRate?: FloatFilter<"Tariff"> | number
    distanceRate?: FloatFilter<"Tariff"> | number
    isActive?: BoolFilter<"Tariff"> | boolean
    createdAt?: DateTimeFilter<"Tariff"> | Date | string
    updatedAt?: DateTimeFilter<"Tariff"> | Date | string
  }

  export type TariffOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TariffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TariffWhereInput | TariffWhereInput[]
    OR?: TariffWhereInput[]
    NOT?: TariffWhereInput | TariffWhereInput[]
    name?: StringFilter<"Tariff"> | string
    baseRate?: FloatFilter<"Tariff"> | number
    weightRate?: FloatFilter<"Tariff"> | number
    volumeRate?: FloatFilter<"Tariff"> | number
    distanceRate?: FloatFilter<"Tariff"> | number
    isActive?: BoolFilter<"Tariff"> | boolean
    createdAt?: DateTimeFilter<"Tariff"> | Date | string
    updatedAt?: DateTimeFilter<"Tariff"> | Date | string
  }, "id">

  export type TariffOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TariffCountOrderByAggregateInput
    _avg?: TariffAvgOrderByAggregateInput
    _max?: TariffMaxOrderByAggregateInput
    _min?: TariffMinOrderByAggregateInput
    _sum?: TariffSumOrderByAggregateInput
  }

  export type TariffScalarWhereWithAggregatesInput = {
    AND?: TariffScalarWhereWithAggregatesInput | TariffScalarWhereWithAggregatesInput[]
    OR?: TariffScalarWhereWithAggregatesInput[]
    NOT?: TariffScalarWhereWithAggregatesInput | TariffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tariff"> | string
    name?: StringWithAggregatesFilter<"Tariff"> | string
    baseRate?: FloatWithAggregatesFilter<"Tariff"> | number
    weightRate?: FloatWithAggregatesFilter<"Tariff"> | number
    volumeRate?: FloatWithAggregatesFilter<"Tariff"> | number
    distanceRate?: FloatWithAggregatesFilter<"Tariff"> | number
    isActive?: BoolWithAggregatesFilter<"Tariff"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Tariff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tariff"> | Date | string
  }

  export type VehicleTypeWhereInput = {
    AND?: VehicleTypeWhereInput | VehicleTypeWhereInput[]
    OR?: VehicleTypeWhereInput[]
    NOT?: VehicleTypeWhereInput | VehicleTypeWhereInput[]
    id?: StringFilter<"VehicleType"> | string
    name?: StringFilter<"VehicleType"> | string
    maxWeight?: FloatFilter<"VehicleType"> | number
    maxVolume?: FloatFilter<"VehicleType"> | number
    createdAt?: DateTimeFilter<"VehicleType"> | Date | string
    updatedAt?: DateTimeFilter<"VehicleType"> | Date | string
  }

  export type VehicleTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    maxWeight?: SortOrder
    maxVolume?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleTypeWhereInput | VehicleTypeWhereInput[]
    OR?: VehicleTypeWhereInput[]
    NOT?: VehicleTypeWhereInput | VehicleTypeWhereInput[]
    name?: StringFilter<"VehicleType"> | string
    maxWeight?: FloatFilter<"VehicleType"> | number
    maxVolume?: FloatFilter<"VehicleType"> | number
    createdAt?: DateTimeFilter<"VehicleType"> | Date | string
    updatedAt?: DateTimeFilter<"VehicleType"> | Date | string
  }, "id">

  export type VehicleTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    maxWeight?: SortOrder
    maxVolume?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleTypeCountOrderByAggregateInput
    _avg?: VehicleTypeAvgOrderByAggregateInput
    _max?: VehicleTypeMaxOrderByAggregateInput
    _min?: VehicleTypeMinOrderByAggregateInput
    _sum?: VehicleTypeSumOrderByAggregateInput
  }

  export type VehicleTypeScalarWhereWithAggregatesInput = {
    AND?: VehicleTypeScalarWhereWithAggregatesInput | VehicleTypeScalarWhereWithAggregatesInput[]
    OR?: VehicleTypeScalarWhereWithAggregatesInput[]
    NOT?: VehicleTypeScalarWhereWithAggregatesInput | VehicleTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleType"> | string
    name?: StringWithAggregatesFilter<"VehicleType"> | string
    maxWeight?: FloatWithAggregatesFilter<"VehicleType"> | number
    maxVolume?: FloatWithAggregatesFilter<"VehicleType"> | number
    createdAt?: DateTimeWithAggregatesFilter<"VehicleType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VehicleType"> | Date | string
  }

  export type CargoTypeWhereInput = {
    AND?: CargoTypeWhereInput | CargoTypeWhereInput[]
    OR?: CargoTypeWhereInput[]
    NOT?: CargoTypeWhereInput | CargoTypeWhereInput[]
    id?: StringFilter<"CargoType"> | string
    name?: StringFilter<"CargoType"> | string
    description?: StringFilter<"CargoType"> | string
    createdAt?: DateTimeFilter<"CargoType"> | Date | string
    updatedAt?: DateTimeFilter<"CargoType"> | Date | string
  }

  export type CargoTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CargoTypeWhereInput | CargoTypeWhereInput[]
    OR?: CargoTypeWhereInput[]
    NOT?: CargoTypeWhereInput | CargoTypeWhereInput[]
    name?: StringFilter<"CargoType"> | string
    description?: StringFilter<"CargoType"> | string
    createdAt?: DateTimeFilter<"CargoType"> | Date | string
    updatedAt?: DateTimeFilter<"CargoType"> | Date | string
  }, "id">

  export type CargoTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CargoTypeCountOrderByAggregateInput
    _max?: CargoTypeMaxOrderByAggregateInput
    _min?: CargoTypeMinOrderByAggregateInput
  }

  export type CargoTypeScalarWhereWithAggregatesInput = {
    AND?: CargoTypeScalarWhereWithAggregatesInput | CargoTypeScalarWhereWithAggregatesInput[]
    OR?: CargoTypeScalarWhereWithAggregatesInput[]
    NOT?: CargoTypeScalarWhereWithAggregatesInput | CargoTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CargoType"> | string
    name?: StringWithAggregatesFilter<"CargoType"> | string
    description?: StringWithAggregatesFilter<"CargoType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CargoType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CargoType"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    phone: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    requests?: CargoRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    phone: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    requests?: CargoRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: CargoRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: CargoRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    phone: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestCreateInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
    statusHistory?: CargoRequestStatusHistoryCreateNestedManyWithoutRequestInput
  }

  export type CargoRequestUncheckedCreateInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
    statusHistory?: CargoRequestStatusHistoryUncheckedCreateNestedManyWithoutRequestInput
  }

  export type CargoRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
    statusHistory?: CargoRequestStatusHistoryUpdateManyWithoutRequestNestedInput
  }

  export type CargoRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    statusHistory?: CargoRequestStatusHistoryUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type CargoRequestCreateManyInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
  }

  export type CargoRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CargoRequestStatusHistoryCreateInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
    request: CargoRequestCreateNestedOneWithoutStatusHistoryInput
  }

  export type CargoRequestStatusHistoryUncheckedCreateInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
    requestId: string
  }

  export type CargoRequestStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: CargoRequestUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type CargoRequestStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestId?: StringFieldUpdateOperationsInput | string
  }

  export type CargoRequestStatusHistoryCreateManyInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
    requestId: string
  }

  export type CargoRequestStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestId?: StringFieldUpdateOperationsInput | string
  }

  export type TariffCreateInput = {
    id?: string
    name: string
    baseRate: number
    weightRate: number
    volumeRate: number
    distanceRate: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TariffUncheckedCreateInput = {
    id?: string
    name: string
    baseRate: number
    weightRate: number
    volumeRate: number
    distanceRate: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TariffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseRate?: FloatFieldUpdateOperationsInput | number
    weightRate?: FloatFieldUpdateOperationsInput | number
    volumeRate?: FloatFieldUpdateOperationsInput | number
    distanceRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TariffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseRate?: FloatFieldUpdateOperationsInput | number
    weightRate?: FloatFieldUpdateOperationsInput | number
    volumeRate?: FloatFieldUpdateOperationsInput | number
    distanceRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TariffCreateManyInput = {
    id?: string
    name: string
    baseRate: number
    weightRate: number
    volumeRate: number
    distanceRate: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TariffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseRate?: FloatFieldUpdateOperationsInput | number
    weightRate?: FloatFieldUpdateOperationsInput | number
    volumeRate?: FloatFieldUpdateOperationsInput | number
    distanceRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TariffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    baseRate?: FloatFieldUpdateOperationsInput | number
    weightRate?: FloatFieldUpdateOperationsInput | number
    volumeRate?: FloatFieldUpdateOperationsInput | number
    distanceRate?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleTypeCreateInput = {
    id?: string
    name: string
    maxWeight: number
    maxVolume: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleTypeUncheckedCreateInput = {
    id?: string
    name: string
    maxWeight: number
    maxVolume: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    maxWeight?: FloatFieldUpdateOperationsInput | number
    maxVolume?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    maxWeight?: FloatFieldUpdateOperationsInput | number
    maxVolume?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleTypeCreateManyInput = {
    id?: string
    name: string
    maxWeight: number
    maxVolume: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    maxWeight?: FloatFieldUpdateOperationsInput | number
    maxVolume?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    maxWeight?: FloatFieldUpdateOperationsInput | number
    maxVolume?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoTypeCreateInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoTypeUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoTypeCreateManyInput = {
    id?: string
    name: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CargoRequestListRelationFilter = {
    every?: CargoRequestWhereInput
    some?: CargoRequestWhereInput
    none?: CargoRequestWhereInput
  }

  export type CargoRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumCargoRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CargoRequestStatus | EnumCargoRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCargoRequestStatusFilter<$PrismaModel> | $Enums.CargoRequestStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CargoRequestStatusHistoryListRelationFilter = {
    every?: CargoRequestStatusHistoryWhereInput
    some?: CargoRequestStatusHistoryWhereInput
    none?: CargoRequestStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CargoRequestStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CargoRequestCountOrderByAggregateInput = {
    id?: SortOrder
    cargoType?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    from?: SortOrder
    to?: SortOrder
    distance?: SortOrder
    vehicleType?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CargoRequestAvgOrderByAggregateInput = {
    weight?: SortOrder
    volume?: SortOrder
    distance?: SortOrder
    cost?: SortOrder
  }

  export type CargoRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    cargoType?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    from?: SortOrder
    to?: SortOrder
    distance?: SortOrder
    vehicleType?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CargoRequestMinOrderByAggregateInput = {
    id?: SortOrder
    cargoType?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    from?: SortOrder
    to?: SortOrder
    distance?: SortOrder
    vehicleType?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CargoRequestSumOrderByAggregateInput = {
    weight?: SortOrder
    volume?: SortOrder
    distance?: SortOrder
    cost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumCargoRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CargoRequestStatus | EnumCargoRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCargoRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.CargoRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCargoRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumCargoRequestStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CargoRequestRelationFilter = {
    is?: CargoRequestWhereInput
    isNot?: CargoRequestWhereInput
  }

  export type CargoRequestStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    requestId?: SortOrder
  }

  export type CargoRequestStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    requestId?: SortOrder
  }

  export type CargoRequestStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    requestId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TariffCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TariffAvgOrderByAggregateInput = {
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
  }

  export type TariffMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TariffMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TariffSumOrderByAggregateInput = {
    baseRate?: SortOrder
    weightRate?: SortOrder
    volumeRate?: SortOrder
    distanceRate?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type VehicleTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    maxWeight?: SortOrder
    maxVolume?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleTypeAvgOrderByAggregateInput = {
    maxWeight?: SortOrder
    maxVolume?: SortOrder
  }

  export type VehicleTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    maxWeight?: SortOrder
    maxVolume?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    maxWeight?: SortOrder
    maxVolume?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleTypeSumOrderByAggregateInput = {
    maxWeight?: SortOrder
    maxVolume?: SortOrder
  }

  export type CargoTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput> | CargoRequestCreateWithoutUserInput[] | CargoRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CargoRequestCreateOrConnectWithoutUserInput | CargoRequestCreateOrConnectWithoutUserInput[]
    createMany?: CargoRequestCreateManyUserInputEnvelope
    connect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
  }

  export type CargoRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput> | CargoRequestCreateWithoutUserInput[] | CargoRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CargoRequestCreateOrConnectWithoutUserInput | CargoRequestCreateOrConnectWithoutUserInput[]
    createMany?: CargoRequestCreateManyUserInputEnvelope
    connect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CargoRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput> | CargoRequestCreateWithoutUserInput[] | CargoRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CargoRequestCreateOrConnectWithoutUserInput | CargoRequestCreateOrConnectWithoutUserInput[]
    upsert?: CargoRequestUpsertWithWhereUniqueWithoutUserInput | CargoRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CargoRequestCreateManyUserInputEnvelope
    set?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    disconnect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    delete?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    connect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    update?: CargoRequestUpdateWithWhereUniqueWithoutUserInput | CargoRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CargoRequestUpdateManyWithWhereWithoutUserInput | CargoRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CargoRequestScalarWhereInput | CargoRequestScalarWhereInput[]
  }

  export type CargoRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput> | CargoRequestCreateWithoutUserInput[] | CargoRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CargoRequestCreateOrConnectWithoutUserInput | CargoRequestCreateOrConnectWithoutUserInput[]
    upsert?: CargoRequestUpsertWithWhereUniqueWithoutUserInput | CargoRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CargoRequestCreateManyUserInputEnvelope
    set?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    disconnect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    delete?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    connect?: CargoRequestWhereUniqueInput | CargoRequestWhereUniqueInput[]
    update?: CargoRequestUpdateWithWhereUniqueWithoutUserInput | CargoRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CargoRequestUpdateManyWithWhereWithoutUserInput | CargoRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CargoRequestScalarWhereInput | CargoRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRequestsInput = {
    create?: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type CargoRequestStatusHistoryCreateNestedManyWithoutRequestInput = {
    create?: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput> | CargoRequestStatusHistoryCreateWithoutRequestInput[] | CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput | CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput[]
    createMany?: CargoRequestStatusHistoryCreateManyRequestInputEnvelope
    connect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
  }

  export type CargoRequestStatusHistoryUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput> | CargoRequestStatusHistoryCreateWithoutRequestInput[] | CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput | CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput[]
    createMany?: CargoRequestStatusHistoryCreateManyRequestInputEnvelope
    connect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCargoRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.CargoRequestStatus
  }

  export type UserUpdateOneWithoutRequestsNestedInput = {
    create?: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestsInput
    upsert?: UserUpsertWithoutRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRequestsInput, UserUpdateWithoutRequestsInput>, UserUncheckedUpdateWithoutRequestsInput>
  }

  export type CargoRequestStatusHistoryUpdateManyWithoutRequestNestedInput = {
    create?: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput> | CargoRequestStatusHistoryCreateWithoutRequestInput[] | CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput | CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput[]
    upsert?: CargoRequestStatusHistoryUpsertWithWhereUniqueWithoutRequestInput | CargoRequestStatusHistoryUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: CargoRequestStatusHistoryCreateManyRequestInputEnvelope
    set?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    disconnect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    delete?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    connect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    update?: CargoRequestStatusHistoryUpdateWithWhereUniqueWithoutRequestInput | CargoRequestStatusHistoryUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: CargoRequestStatusHistoryUpdateManyWithWhereWithoutRequestInput | CargoRequestStatusHistoryUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: CargoRequestStatusHistoryScalarWhereInput | CargoRequestStatusHistoryScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CargoRequestStatusHistoryUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput> | CargoRequestStatusHistoryCreateWithoutRequestInput[] | CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput | CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput[]
    upsert?: CargoRequestStatusHistoryUpsertWithWhereUniqueWithoutRequestInput | CargoRequestStatusHistoryUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: CargoRequestStatusHistoryCreateManyRequestInputEnvelope
    set?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    disconnect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    delete?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    connect?: CargoRequestStatusHistoryWhereUniqueInput | CargoRequestStatusHistoryWhereUniqueInput[]
    update?: CargoRequestStatusHistoryUpdateWithWhereUniqueWithoutRequestInput | CargoRequestStatusHistoryUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: CargoRequestStatusHistoryUpdateManyWithWhereWithoutRequestInput | CargoRequestStatusHistoryUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: CargoRequestStatusHistoryScalarWhereInput | CargoRequestStatusHistoryScalarWhereInput[]
  }

  export type CargoRequestCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<CargoRequestCreateWithoutStatusHistoryInput, CargoRequestUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CargoRequestCreateOrConnectWithoutStatusHistoryInput
    connect?: CargoRequestWhereUniqueInput
  }

  export type CargoRequestUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<CargoRequestCreateWithoutStatusHistoryInput, CargoRequestUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CargoRequestCreateOrConnectWithoutStatusHistoryInput
    upsert?: CargoRequestUpsertWithoutStatusHistoryInput
    connect?: CargoRequestWhereUniqueInput
    update?: XOR<XOR<CargoRequestUpdateToOneWithWhereWithoutStatusHistoryInput, CargoRequestUpdateWithoutStatusHistoryInput>, CargoRequestUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCargoRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CargoRequestStatus | EnumCargoRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCargoRequestStatusFilter<$PrismaModel> | $Enums.CargoRequestStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCargoRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CargoRequestStatus | EnumCargoRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CargoRequestStatus[] | ListEnumCargoRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCargoRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.CargoRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCargoRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumCargoRequestStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CargoRequestCreateWithoutUserInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: CargoRequestStatusHistoryCreateNestedManyWithoutRequestInput
  }

  export type CargoRequestUncheckedCreateWithoutUserInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: CargoRequestStatusHistoryUncheckedCreateNestedManyWithoutRequestInput
  }

  export type CargoRequestCreateOrConnectWithoutUserInput = {
    where: CargoRequestWhereUniqueInput
    create: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput>
  }

  export type CargoRequestCreateManyUserInputEnvelope = {
    data: CargoRequestCreateManyUserInput | CargoRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CargoRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: CargoRequestWhereUniqueInput
    update: XOR<CargoRequestUpdateWithoutUserInput, CargoRequestUncheckedUpdateWithoutUserInput>
    create: XOR<CargoRequestCreateWithoutUserInput, CargoRequestUncheckedCreateWithoutUserInput>
  }

  export type CargoRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: CargoRequestWhereUniqueInput
    data: XOR<CargoRequestUpdateWithoutUserInput, CargoRequestUncheckedUpdateWithoutUserInput>
  }

  export type CargoRequestUpdateManyWithWhereWithoutUserInput = {
    where: CargoRequestScalarWhereInput
    data: XOR<CargoRequestUpdateManyMutationInput, CargoRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type CargoRequestScalarWhereInput = {
    AND?: CargoRequestScalarWhereInput | CargoRequestScalarWhereInput[]
    OR?: CargoRequestScalarWhereInput[]
    NOT?: CargoRequestScalarWhereInput | CargoRequestScalarWhereInput[]
    id?: StringFilter<"CargoRequest"> | string
    cargoType?: StringFilter<"CargoRequest"> | string
    weight?: FloatFilter<"CargoRequest"> | number
    volume?: FloatFilter<"CargoRequest"> | number
    from?: StringFilter<"CargoRequest"> | string
    to?: StringFilter<"CargoRequest"> | string
    distance?: FloatNullableFilter<"CargoRequest"> | number | null
    vehicleType?: StringFilter<"CargoRequest"> | string
    name?: StringFilter<"CargoRequest"> | string
    email?: StringFilter<"CargoRequest"> | string
    phone?: StringFilter<"CargoRequest"> | string
    status?: EnumCargoRequestStatusFilter<"CargoRequest"> | $Enums.CargoRequestStatus
    cost?: FloatNullableFilter<"CargoRequest"> | number | null
    createdAt?: DateTimeFilter<"CargoRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CargoRequest"> | Date | string
    userId?: StringNullableFilter<"CargoRequest"> | string | null
  }

  export type UserCreateWithoutRequestsInput = {
    id?: string
    name: string
    email: string
    password: string
    phone: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutRequestsInput = {
    id?: string
    name: string
    email: string
    password: string
    phone: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
  }

  export type CargoRequestStatusHistoryCreateWithoutRequestInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
  }

  export type CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
  }

  export type CargoRequestStatusHistoryCreateOrConnectWithoutRequestInput = {
    where: CargoRequestStatusHistoryWhereUniqueInput
    create: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput>
  }

  export type CargoRequestStatusHistoryCreateManyRequestInputEnvelope = {
    data: CargoRequestStatusHistoryCreateManyRequestInput | CargoRequestStatusHistoryCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRequestsInput = {
    update: XOR<UserUpdateWithoutRequestsInput, UserUncheckedUpdateWithoutRequestsInput>
    create: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRequestsInput, UserUncheckedUpdateWithoutRequestsInput>
  }

  export type UserUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestStatusHistoryUpsertWithWhereUniqueWithoutRequestInput = {
    where: CargoRequestStatusHistoryWhereUniqueInput
    update: XOR<CargoRequestStatusHistoryUpdateWithoutRequestInput, CargoRequestStatusHistoryUncheckedUpdateWithoutRequestInput>
    create: XOR<CargoRequestStatusHistoryCreateWithoutRequestInput, CargoRequestStatusHistoryUncheckedCreateWithoutRequestInput>
  }

  export type CargoRequestStatusHistoryUpdateWithWhereUniqueWithoutRequestInput = {
    where: CargoRequestStatusHistoryWhereUniqueInput
    data: XOR<CargoRequestStatusHistoryUpdateWithoutRequestInput, CargoRequestStatusHistoryUncheckedUpdateWithoutRequestInput>
  }

  export type CargoRequestStatusHistoryUpdateManyWithWhereWithoutRequestInput = {
    where: CargoRequestStatusHistoryScalarWhereInput
    data: XOR<CargoRequestStatusHistoryUpdateManyMutationInput, CargoRequestStatusHistoryUncheckedUpdateManyWithoutRequestInput>
  }

  export type CargoRequestStatusHistoryScalarWhereInput = {
    AND?: CargoRequestStatusHistoryScalarWhereInput | CargoRequestStatusHistoryScalarWhereInput[]
    OR?: CargoRequestStatusHistoryScalarWhereInput[]
    NOT?: CargoRequestStatusHistoryScalarWhereInput | CargoRequestStatusHistoryScalarWhereInput[]
    id?: StringFilter<"CargoRequestStatusHistory"> | string
    status?: EnumCargoRequestStatusFilter<"CargoRequestStatusHistory"> | $Enums.CargoRequestStatus
    comment?: StringNullableFilter<"CargoRequestStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"CargoRequestStatusHistory"> | Date | string
    requestId?: StringFilter<"CargoRequestStatusHistory"> | string
  }

  export type CargoRequestCreateWithoutStatusHistoryInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
  }

  export type CargoRequestUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: string | null
  }

  export type CargoRequestCreateOrConnectWithoutStatusHistoryInput = {
    where: CargoRequestWhereUniqueInput
    create: XOR<CargoRequestCreateWithoutStatusHistoryInput, CargoRequestUncheckedCreateWithoutStatusHistoryInput>
  }

  export type CargoRequestUpsertWithoutStatusHistoryInput = {
    update: XOR<CargoRequestUpdateWithoutStatusHistoryInput, CargoRequestUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<CargoRequestCreateWithoutStatusHistoryInput, CargoRequestUncheckedCreateWithoutStatusHistoryInput>
    where?: CargoRequestWhereInput
  }

  export type CargoRequestUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: CargoRequestWhereInput
    data: XOR<CargoRequestUpdateWithoutStatusHistoryInput, CargoRequestUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type CargoRequestUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
  }

  export type CargoRequestUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CargoRequestCreateManyUserInput = {
    id?: string
    cargoType: string
    weight: number
    volume: number
    from: string
    to: string
    distance?: number | null
    vehicleType: string
    name: string
    email: string
    phone: string
    status?: $Enums.CargoRequestStatus
    cost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: CargoRequestStatusHistoryUpdateManyWithoutRequestNestedInput
  }

  export type CargoRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: CargoRequestStatusHistoryUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type CargoRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoType?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestStatusHistoryCreateManyRequestInput = {
    id?: string
    status: $Enums.CargoRequestStatus
    comment?: string | null
    createdAt?: Date | string
  }

  export type CargoRequestStatusHistoryUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestStatusHistoryUncheckedUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoRequestStatusHistoryUncheckedUpdateManyWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumCargoRequestStatusFieldUpdateOperationsInput | $Enums.CargoRequestStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CargoRequestCountOutputTypeDefaultArgs instead
     */
    export type CargoRequestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CargoRequestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CargoRequestDefaultArgs instead
     */
    export type CargoRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CargoRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CargoRequestStatusHistoryDefaultArgs instead
     */
    export type CargoRequestStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CargoRequestStatusHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TariffDefaultArgs instead
     */
    export type TariffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TariffDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VehicleTypeDefaultArgs instead
     */
    export type VehicleTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VehicleTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CargoTypeDefaultArgs instead
     */
    export type CargoTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CargoTypeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
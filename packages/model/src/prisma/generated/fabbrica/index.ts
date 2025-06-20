import type { Account } from "@prisma/client";
import type { Session } from "@prisma/client";
import type { User } from "@prisma/client";
import type { VerificationToken } from "@prisma/client";
import type { Post } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";
import { createInitializer, createScreener, getScalarFieldValueGenerator, normalizeResolver, normalizeList, getSequenceCounter, createCallbackChain, destructure } from "@quramy/prisma-fabbrica/lib/internal";
import type { ModelWithFields, Resolver, } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;

type TraitName = string | symbol;

type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};

const initializer = createInitializer();

const { getClient } = initializer;

export const { initialize } = initializer;

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "Account",
        fields: [{
                name: "user",
                type: "User",
                relationName: "AccountToUser"
            }]
    }, {
        name: "Session",
        fields: [{
                name: "user",
                type: "User",
                relationName: "SessionToUser"
            }]
    }, {
        name: "User",
        fields: [{
                name: "accounts",
                type: "Account",
                relationName: "AccountToUser"
            }, {
                name: "sessions",
                type: "Session",
                relationName: "SessionToUser"
            }, {
                name: "posts",
                type: "Post",
                relationName: "PostToUser"
            }]
    }, {
        name: "VerificationToken",
        fields: []
    }, {
        name: "Post",
        fields: [{
                name: "author",
                type: "User",
                relationName: "PostToUser"
            }]
    }];

type AccountScalarOrEnumFields = {
    type: string;
    provider: string;
    providerAccountId: string;
};

type AccountuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAccountsInput["create"]>;
};

type AccountFactoryDefineInput = {
    id?: string;
    type?: string;
    provider?: string;
    providerAccountId?: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: AccountuserFactory | Prisma.UserCreateNestedOneWithoutAccountsInput;
};

type AccountTransientFields = Record<string, unknown> & Partial<Record<keyof AccountFactoryDefineInput, never>>;

type AccountFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<AccountFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Account, Prisma.AccountCreateInput, TTransients>;

type AccountFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<AccountFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: AccountFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Account, Prisma.AccountCreateInput, TTransients>;

function isAccountuserFactory(x: AccountuserFactory | Prisma.UserCreateNestedOneWithoutAccountsInput | undefined): x is AccountuserFactory {
    return (x as any)?._factoryFor === "User";
}

type AccountTraitKeys<TOptions extends AccountFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface AccountFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Account";
    build(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput>;
    buildList(list: readonly Partial<Prisma.AccountCreateInput & TTransients>[]): PromiseLike<Prisma.AccountCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput[]>;
    pickForConnect(inputData: Account): Pick<Account, "id">;
    create(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Account>;
    createList(list: readonly Partial<Prisma.AccountCreateInput & TTransients>[]): PromiseLike<Account[]>;
    createList(count: number, item?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Account[]>;
    createForConnect(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Pick<Account, "id">>;
}

export interface AccountFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends AccountFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): AccountFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateAccountScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AccountScalarOrEnumFields {
    return {
        type: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "type", isId: false, isUnique: false, seq }),
        provider: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "provider", isId: false, isUnique: true, seq }),
        providerAccountId: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "providerAccountId", isId: false, isUnique: true, seq })
    };
}

function defineAccountFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends AccountFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): AccountFactoryInterface<TTransients, AccountTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly AccountTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Account", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAccountScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AccountFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AccountFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isAccountuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.AccountCreateInput;
            const data: Prisma.AccountCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.AccountCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Account) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().account.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.AccountCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Account" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AccountTraitKeys<TOptions>, ...names: readonly AccountTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface AccountFactoryBuilder {
    <TOptions extends AccountFactoryDefineOptions>(options: TOptions): AccountFactoryInterface<{}, AccountTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends AccountTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends AccountFactoryDefineOptions<TTransients>>(options: TOptions) => AccountFactoryInterface<TTransients, AccountTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Account} model.
 *
 * @param options
 * @returns factory {@link AccountFactoryInterface}
 */
export const defineAccountFactory = (<TOptions extends AccountFactoryDefineOptions>(options: TOptions): AccountFactoryInterface<TOptions> => {
    return defineAccountFactoryInternal(options, {});
}) as AccountFactoryBuilder;

defineAccountFactory.withTransientFields = defaultTransientFieldValues => options => defineAccountFactoryInternal(options, defaultTransientFieldValues);

type SessionScalarOrEnumFields = {
    sessionToken: string;
    expires: Date;
};

type SessionuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutSessionsInput["create"]>;
};

type SessionFactoryDefineInput = {
    id?: string;
    sessionToken?: string;
    expires?: Date;
    user: SessionuserFactory | Prisma.UserCreateNestedOneWithoutSessionsInput;
};

type SessionTransientFields = Record<string, unknown> & Partial<Record<keyof SessionFactoryDefineInput, never>>;

type SessionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<SessionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Session, Prisma.SessionCreateInput, TTransients>;

type SessionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<SessionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: SessionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Session, Prisma.SessionCreateInput, TTransients>;

function isSessionuserFactory(x: SessionuserFactory | Prisma.UserCreateNestedOneWithoutSessionsInput | undefined): x is SessionuserFactory {
    return (x as any)?._factoryFor === "User";
}

type SessionTraitKeys<TOptions extends SessionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface SessionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Session";
    build(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput>;
    buildList(list: readonly Partial<Prisma.SessionCreateInput & TTransients>[]): PromiseLike<Prisma.SessionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput[]>;
    pickForConnect(inputData: Session): Pick<Session, "id">;
    create(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Session>;
    createList(list: readonly Partial<Prisma.SessionCreateInput & TTransients>[]): PromiseLike<Session[]>;
    createList(count: number, item?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Session[]>;
    createForConnect(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Pick<Session, "id">>;
}

export interface SessionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends SessionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): SessionFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateSessionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SessionScalarOrEnumFields {
    return {
        sessionToken: getScalarFieldValueGenerator().String({ modelName: "Session", fieldName: "sessionToken", isId: false, isUnique: true, seq }),
        expires: getScalarFieldValueGenerator().DateTime({ modelName: "Session", fieldName: "expires", isId: false, isUnique: false, seq })
    };
}

function defineSessionFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends SessionFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): SessionFactoryInterface<TTransients, SessionTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly SessionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Session", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSessionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SessionFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SessionFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isSessionuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.SessionCreateInput;
            const data: Prisma.SessionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SessionCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Session) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().session.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SessionCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Session" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SessionTraitKeys<TOptions>, ...names: readonly SessionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface SessionFactoryBuilder {
    <TOptions extends SessionFactoryDefineOptions>(options: TOptions): SessionFactoryInterface<{}, SessionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends SessionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends SessionFactoryDefineOptions<TTransients>>(options: TOptions) => SessionFactoryInterface<TTransients, SessionTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Session} model.
 *
 * @param options
 * @returns factory {@link SessionFactoryInterface}
 */
export const defineSessionFactory = (<TOptions extends SessionFactoryDefineOptions>(options: TOptions): SessionFactoryInterface<TOptions> => {
    return defineSessionFactoryInternal(options, {});
}) as SessionFactoryBuilder;

defineSessionFactory.withTransientFields = defaultTransientFieldValues => options => defineSessionFactoryInternal(options, defaultTransientFieldValues);

type UserScalarOrEnumFields = {};

type UserFactoryDefineInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
};

type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;

type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;

type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;

type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "id">>;
}

export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {};
}

function defineUserFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends UserFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): UserFactoryInterface<TTransients, UserTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly UserTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("User", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {} as Prisma.UserCreateInput;
            const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.UserCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: User) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().user.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.UserCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export const defineUserFactory = (<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions> => {
    return defineUserFactoryInternal(options ?? {}, {});
}) as UserFactoryBuilder;

defineUserFactory.withTransientFields = defaultTransientFieldValues => options => defineUserFactoryInternal(options ?? {}, defaultTransientFieldValues);

type VerificationTokenScalarOrEnumFields = {
    identifier: string;
    token: string;
    expires: Date;
};

type VerificationTokenFactoryDefineInput = {
    identifier?: string;
    token?: string;
    expires?: Date;
};

type VerificationTokenTransientFields = Record<string, unknown> & Partial<Record<keyof VerificationTokenFactoryDefineInput, never>>;

type VerificationTokenFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<VerificationTokenFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<VerificationToken, Prisma.VerificationTokenCreateInput, TTransients>;

type VerificationTokenFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<VerificationTokenFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: VerificationTokenFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<VerificationToken, Prisma.VerificationTokenCreateInput, TTransients>;

type VerificationTokenTraitKeys<TOptions extends VerificationTokenFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface VerificationTokenFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "VerificationToken";
    build(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput>;
    buildList(list: readonly Partial<Prisma.VerificationTokenCreateInput & TTransients>[]): PromiseLike<Prisma.VerificationTokenCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput[]>;
    pickForConnect(inputData: VerificationToken): Pick<VerificationToken, "identifier" | "token">;
    create(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<VerificationToken>;
    createList(list: readonly Partial<Prisma.VerificationTokenCreateInput & TTransients>[]): PromiseLike<VerificationToken[]>;
    createList(count: number, item?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<VerificationToken[]>;
    createForConnect(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Pick<VerificationToken, "identifier" | "token">>;
}

export interface VerificationTokenFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends VerificationTokenFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): VerificationTokenFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateVerificationTokenScalarsOrEnums({ seq }: {
    readonly seq: number;
}): VerificationTokenScalarOrEnumFields {
    return {
        identifier: getScalarFieldValueGenerator().String({ modelName: "VerificationToken", fieldName: "identifier", isId: false, isUnique: true, seq }),
        token: getScalarFieldValueGenerator().String({ modelName: "VerificationToken", fieldName: "token", isId: false, isUnique: true, seq }),
        expires: getScalarFieldValueGenerator().DateTime({ modelName: "VerificationToken", fieldName: "expires", isId: false, isUnique: false, seq })
    };
}

function defineVerificationTokenFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends VerificationTokenFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): VerificationTokenFactoryInterface<TTransients, VerificationTokenTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly VerificationTokenTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("VerificationToken", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateVerificationTokenScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<VerificationTokenFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<VerificationTokenFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {} as Prisma.VerificationTokenCreateInput;
            const data: Prisma.VerificationTokenCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.VerificationTokenCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: VerificationToken) => ({
            identifier: inputData.identifier,
            token: inputData.token
        });
        const create = async (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().verificationToken.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.VerificationTokenCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "VerificationToken" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: VerificationTokenTraitKeys<TOptions>, ...names: readonly VerificationTokenTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface VerificationTokenFactoryBuilder {
    <TOptions extends VerificationTokenFactoryDefineOptions>(options?: TOptions): VerificationTokenFactoryInterface<{}, VerificationTokenTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends VerificationTokenTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends VerificationTokenFactoryDefineOptions<TTransients>>(options?: TOptions) => VerificationTokenFactoryInterface<TTransients, VerificationTokenTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link VerificationToken} model.
 *
 * @param options
 * @returns factory {@link VerificationTokenFactoryInterface}
 */
export const defineVerificationTokenFactory = (<TOptions extends VerificationTokenFactoryDefineOptions>(options?: TOptions): VerificationTokenFactoryInterface<TOptions> => {
    return defineVerificationTokenFactoryInternal(options ?? {}, {});
}) as VerificationTokenFactoryBuilder;

defineVerificationTokenFactory.withTransientFields = defaultTransientFieldValues => options => defineVerificationTokenFactoryInternal(options ?? {}, defaultTransientFieldValues);

type PostScalarOrEnumFields = {
    title: string;
};

type PostauthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPostsInput["create"]>;
};

type PostFactoryDefineInput = {
    title?: string;
    content?: string | null;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    author: PostauthorFactory | Prisma.UserCreateNestedOneWithoutPostsInput;
};

type PostTransientFields = Record<string, unknown> & Partial<Record<keyof PostFactoryDefineInput, never>>;

type PostFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<PostFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Post, Prisma.PostCreateInput, TTransients>;

type PostFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<PostFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: PostFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Post, Prisma.PostCreateInput, TTransients>;

function isPostauthorFactory(x: PostauthorFactory | Prisma.UserCreateNestedOneWithoutPostsInput | undefined): x is PostauthorFactory {
    return (x as any)?._factoryFor === "User";
}

type PostTraitKeys<TOptions extends PostFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface PostFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Post";
    build(inputData?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Prisma.PostCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Prisma.PostCreateInput>;
    buildList(list: readonly Partial<Prisma.PostCreateInput & TTransients>[]): PromiseLike<Prisma.PostCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Prisma.PostCreateInput[]>;
    pickForConnect(inputData: Post): Pick<Post, "id">;
    create(inputData?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Post>;
    createList(list: readonly Partial<Prisma.PostCreateInput & TTransients>[]): PromiseLike<Post[]>;
    createList(count: number, item?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Post[]>;
    createForConnect(inputData?: Partial<Prisma.PostCreateInput & TTransients>): PromiseLike<Pick<Post, "id">>;
}

export interface PostFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends PostFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): PostFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGeneratePostScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PostScalarOrEnumFields {
    return {
        title: getScalarFieldValueGenerator().String({ modelName: "Post", fieldName: "title", isId: false, isUnique: false, seq })
    };
}

function definePostFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends PostFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): PostFactoryInterface<TTransients, PostTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly PostTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Post", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.PostCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePostScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PostFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PostFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                author: isPostauthorFactory(defaultData.author) ? {
                    create: await defaultData.author.build()
                } : defaultData.author
            } as Prisma.PostCreateInput;
            const data: Prisma.PostCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.PostCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Post) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PostCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().post.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.PostCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PostCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Post" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PostTraitKeys<TOptions>, ...names: readonly PostTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface PostFactoryBuilder {
    <TOptions extends PostFactoryDefineOptions>(options: TOptions): PostFactoryInterface<{}, PostTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends PostTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends PostFactoryDefineOptions<TTransients>>(options: TOptions) => PostFactoryInterface<TTransients, PostTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Post} model.
 *
 * @param options
 * @returns factory {@link PostFactoryInterface}
 */
export const definePostFactory = (<TOptions extends PostFactoryDefineOptions>(options: TOptions): PostFactoryInterface<TOptions> => {
    return definePostFactoryInternal(options, {});
}) as PostFactoryBuilder;

definePostFactory.withTransientFields = defaultTransientFieldValues => options => definePostFactoryInternal(options, defaultTransientFieldValues);

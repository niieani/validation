import { Rule, RuleProperty } from './rule';
import { ValidationParser, PropertyAccessor } from './validation-parser';
/**
 * Part of the fluent rule API. Enables customizing property rules.
 */
export declare class FluentRuleCustomizer<TObject, TValue> {
    private fluentEnsure;
    private fluentRules;
    private parser;
    private rule;
    constructor(property: RuleProperty, condition: (value: TValue, object?: TObject) => boolean | Promise<boolean>, config: Object, fluentEnsure: FluentEnsure<TObject>, fluentRules: FluentRules<TObject, TValue>, parser: ValidationParser);
    /**
     * Specifies the key to use when looking up the rule's validation message.
     */
    withMessageKey(key: string): this;
    /**
     * Specifies rule's validation message.
     */
    withMessage(message: string): this;
    /**
     * Specifies a condition that must be met before attempting to validate the rule.
     * @param condition A function that accepts the object as a parameter and returns true
     * or false whether the rule should be evaluated.
     */
    when(condition: (object: TObject) => boolean): this;
    /**
     * Tags the rule instance, enabling the rule to be found easily
     * using ValidationRules.taggedRules(rules, tag)
     */
    tag(tag: string): this;
    /**
     * Target a property with validation rules.
     * @param property The property to target. Can be the property name or a property accessor function.
     */
    ensure<TValue2>(subject: string | {
        (model: TObject): TValue2;
    }): FluentRules<TObject, TValue2>;
    /**
     * Targets an object with validation rules.
     */
    ensureObject(): FluentRules<TObject, TObject>;
    /**
     * Rules that have been defined using the fluent API.
     */
    readonly rules: Rule<TObject, any>[];
    /**
     * Applies the rules to a class or object, making them discoverable by the StandardValidator.
     * @param target A class or object.
     */
    on(target: any): FluentEnsure<TObject>;
    /**
     * Applies an ad-hoc rule function to the ensured property or object.
     * @param condition The function to validate the rule.
     * Will be called with two arguments, the property value and the object.
     * Should return a boolean or a Promise that resolves to a boolean.
     */
    satisfies(condition: (value: TValue, object?: TObject) => boolean | Promise<boolean>, config?: Object): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies a rule by name.
     * @param name The name of the custom or standard rule.
     * @param args The rule's arguments.
     */
    satisfiesRule(name: string, ...args: any[]): any;
    /**
     * Applies the "required" rule to the property.
     * The value cannot be null, undefined or whitespace.
     */
    required(): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "matches" rule to the property.
     * Value must match the specified regular expression.
     * null, undefined and empty-string values are considered valid.
     */
    matches(regex: RegExp): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "email" rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    email(): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "minLength" STRING validation rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    minLength(length: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "maxLength" STRING validation rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    maxLength(length: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "minItems" ARRAY validation rule to the property.
     * null and undefined values are considered valid.
     */
    minItems(count: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "maxItems" ARRAY validation rule to the property.
     * null and undefined values are considered valid.
     */
    maxItems(count: number): FluentRuleCustomizer<TObject, TValue>;
}
/**
 * Part of the fluent rule API. Enables applying rules to properties and objects.
 */
export declare class FluentRules<TObject, TValue> {
    private fluentEnsure;
    private parser;
    private property;
    static customRules: {
        [name: string]: {
            condition: (value: any, object?: any, ...fluentArgs: any[]) => boolean | Promise<boolean>;
            argsToConfig?: (...args: any[]) => any;
        };
    };
    constructor(fluentEnsure: FluentEnsure<TObject>, parser: ValidationParser, property: RuleProperty);
    /**
     * Sets the display name of the ensured property.
     */
    displayName(name: string): this;
    /**
     * Applies an ad-hoc rule function to the ensured property or object.
     * @param condition The function to validate the rule.
     * Will be called with two arguments, the property value and the object.
     * Should return a boolean or a Promise that resolves to a boolean.
     */
    satisfies(condition: (value: TValue, object?: TObject) => boolean | Promise<boolean>, config?: Object): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies a rule by name.
     * @param name The name of the custom or standard rule.
     * @param args The rule's arguments.
     */
    satisfiesRule(name: string, ...args: any[]): any;
    /**
     * Applies the "required" rule to the property.
     * The value cannot be null, undefined or whitespace.
     */
    required(): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "matches" rule to the property.
     * Value must match the specified regular expression.
     * null, undefined and empty-string values are considered valid.
     */
    matches(regex: RegExp): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "email" rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    email(): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "minLength" STRING validation rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    minLength(length: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "maxLength" STRING validation rule to the property.
     * null, undefined and empty-string values are considered valid.
     */
    maxLength(length: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "minItems" ARRAY validation rule to the property.
     * null and undefined values are considered valid.
     */
    minItems(count: number): FluentRuleCustomizer<TObject, TValue>;
    /**
     * Applies the "maxItems" ARRAY validation rule to the property.
     * null and undefined values are considered valid.
     */
    maxItems(count: number): FluentRuleCustomizer<TObject, TValue>;
}
/**
 * Part of the fluent rule API. Enables targeting properties and objects with rules.
 */
export declare class FluentEnsure<TObject> {
    private parser;
    /**
     * Rules that have been defined using the fluent API.
     */
    rules: Rule<TObject, any>[];
    constructor(parser: ValidationParser);
    /**
     * Target a property with validation rules.
     * @param property The property to target. Can be the property name or a property accessor function.
     */
    ensure<TValue>(property: string | PropertyAccessor<TObject, TValue>): FluentRules<TObject, TValue>;
    /**
     * Targets an object with validation rules.
     */
    ensureObject(): FluentRules<TObject, TObject>;
    /**
     * Applies the rules to a class or object, making them discoverable by the StandardValidator.
     * @param target A class or object.
     */
    on(target: any): this;
    private assertInitialized();
}
/**
 * Fluent rule definition API.
 */
export declare class ValidationRules {
    private static parser;
    static initialize(parser: ValidationParser): void;
    /**
     * Target a property with validation rules.
     * @param property The property to target. Can be the property name or a property accessor function.
     */
    static ensure<TObject, TValue>(property: string | PropertyAccessor<TObject, TValue>): FluentRules<TObject, TValue>;
    /**
     * Targets an object with validation rules.
     */
    static ensureObject<TObject>(): FluentRules<TObject, TObject>;
    /**
     * Defines a custom rule.
     * @param name The name of the custom rule. Also serves as the message key.
     * @param condition The rule function.
     * @param message The message expression
     * @param argsToConfig A function that maps the rule's arguments to a "config" object that can be used when evaluating the message expression.
     */
    static customRule(name: string, condition: (value: any, object?: any, ...args: any[]) => boolean | Promise<boolean>, message: string, argsToConfig?: (...args: any[]) => any): void;
    /**
     * Returns rules with the matching tag.
     * @param rules The rules to search.
     * @param tag The tag to search for.
     */
    static taggedRules(rules: Rule<any, any>[], tag: string): Rule<any, any>[];
}

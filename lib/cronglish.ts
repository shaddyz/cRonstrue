import StringUtilities from './stringUtilities'
import Options from './options'
import DescriptionTypeEnum from './descriptionTypeEnum'
import CasingTypeEnum from './casingTypeEnum'

class ExpressionDescriptor {
    expression: string;
    parsed: boolean = false;
    options: Options;
    text: any;

    constructor(expression: string) {
        this.expression = expression;
        this.parsed = false;
        this.options = new Options();
        this.text = {
            "EveryMinute": "every minute",
            "EveryHour": "every hour",
            "AnErrorOccuredWhenGeneratingTheExpressionD": "An error occured when generating the expression description.  Check the cron expression syntax.",
            "AtSpace": "At ",
            "EveryMinuteBetweenX0AndX1": "Every minute between {0} and {1}",
            "At": "At",
            "SpaceAnd": " and",
            "EverySecond": "every second",
            "EveryX0Seconds": "every {0} seconds",
            "SecondsX0ThroughX1PastTheMinute": "seconds {0} through {1} past the minute",
            "AtX0SecondsPastTheMinute": "at {0} seconds past the minute",
            "EveryX0Minutes": "every {0} minutes",
            "MinutesX0ThroughX1PastTheHour": "minutes {0} through {1} past the hour",
            "AtX0MinutesPastTheHour": "at {0} minutes past the hour",
            "EveryX0Hours": "every {0} hours",
            "BetweenX0AndX1": "between {0} and {1}",
            "AtX0": "at {0}",
            "ComaEveryDay": ", every day",
            "ComaEveryX0DaysOfTheWeek": ", every {0} days of the week",
            "ComaX0ThroughX1": ", {0} through {1}",
            "First": "first",
            "Second": "second",
            "Third": "third",
            "Forth": "forth",
            "Fifth": "fifth",
            "ComaOnThe": ", on the ",
            "SpaceX0OfTheMonth": " {0} of the month",
            "ComaOnTheLastX0OfTheMonth": ", on the last {0} of the month",
            "ComaOnlyOnX0": ", only on {0}",
            "ComaEveryX0Months": ", every {0} months",
            "ComaOnlyInX0": ", only in {0}",
            "ComaOnTheLastDayOfTheMonth": ", on the last day of the month",
            "ComaOnTheLastWeekdayOfTheMonth": ", on the last weekday of the month",
            "FirstWeekday": "first weekday",
            "WeekdayNearestDayX0": "weekday nearest day {0}",
            "ComaOnTheX0OfTheMonth": ", on the {0} of the month",
            "ComaEveryX0Days": ", every {0} days",
            "ComaBetweenDayX0AndX1OfTheMonth": ", between day {0} and {1} of the month",
            "ComaOnDayX0OfTheMonth": ", on day {0} of the month",
            "SpaceAndSpace": " and ",
            "ComaEveryMinute": ", every minute",
            "ComaEveryHour": ", every hour",
            "ComaEveryX0Years": ", every {0} years",
            "CommaStartingX0": ", starting {0}"
        };
    }

    getDescription(type: DescriptionTypeEnum) {
        var description = "";
        try {
            if (!this.parsed) {
            }
            switch (type) {
                case DescriptionTypeEnum.FULL:
                    description = this.getFullDescription();
                    break;
                case DescriptionTypeEnum.TIMEOFDAY:
                    description = this.getTimeOfDayDescription();
                    break;
                case DescriptionTypeEnum.HOURS:
                    description = this.getHoursDescription();
                    break;
                case DescriptionTypeEnum.MINUTES:
                    description = this.getMinutesDescription();
                    break;
                case DescriptionTypeEnum.SECONDS:
                    description = this.getSecondsDescription();
                    break;
                case DescriptionTypeEnum.DAYOFMONTH:
                    description = this.getDayOfMonthDescription();
                    break;
                case DescriptionTypeEnum.MONTH:
                    description = this.getMonthDescription();
                    break;
                case DescriptionTypeEnum.DAYOFWEEK:
                    description = this.getDayOfWeekDescription();
                    break;
                case DescriptionTypeEnum.YEAR:
                    description = this.getYearDescription();
                    break;
                default:
                    description = this.getSecondsDescription();
                    break;
            }
        }
        catch (ex) {
            description = ex.Message;
            throw new Error("error!");
        }
        return description;
    }

    getFullDescription() {
        var description: string;
        try {
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description = "" + timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, this.options.verbose);
            description = this.transformCase(description, this.options.casingType);
        }
        catch (ex) {
            description = this.text.AnErrorOccuredWhenGeneratingTheExpressionD;
            if (this.options.throwExceptionOnParseError) {
                throw new Error("Invalid format: " + description);
            }
        }
        return description;
    }

    getTimeOfDayDescription() {
        return "";
    }
    getHoursDescription() {
        return "";
    }
    getMinutesDescription() {
        return "";
    }
    getSecondsDescription() {
        return "";
    }
    getDayOfMonthDescription() {
        return "";
    }
    getMonthDescription() {
        return "";
    }
    getDayOfWeekDescription() {
        return "";
    }
    getYearDescription() {
        return "";
    }
    transformVerbosity(description: string, useVerboseFormat: boolean) {
        if (!useVerboseFormat) {
            description = description.replace(this.text.ComaEveryMinute, "");
            description = description.replace(this.text.CommaEveryHour, "");
            description = description.replace(this.text.ComaEveryDay, "");
        }
        return description;
    }

    transformCase(description: string, caseType: CasingTypeEnum) {
        switch (caseType) {
            case CasingTypeEnum.SENTENCE:
                description = description.toLocaleUpperCase();
                break;
            case CasingTypeEnum.TITLE:
                description = StringUtilities.toProperCase(description);
                break;
            default:
                description = description.toLocaleLowerCase();
                break;
        }
        return description;
    }
}

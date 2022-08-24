function EventHandler(arr)
{
    this.arr = arr;

    this.getEventsBetweenDates = function(start, end)
    {
        var outArr = [];
        var startDate = convertToDate(start);
        var endDate = convertToDate(end);

        outArr = this.arr.filter(function(element)
        {
            return (convertToDate(element.dateStart) >= startDate && convertToDate(element.dateEnd) <= endDate);
        });
        return outArr;
    }

    this.getByMonth = function(month)
    {
        var outArr = [];
        var eg = new Date();

        outArr = this.arr.filter(function(element)
        {
            return (convertToDate(element.dateStart).getMonth() + 1 === month)
        });
        return outArr;
    }

    this.getUniqueDateAndSort = function()
    {
        var outArr = [];
        var startDates = [];
        var endDates = [];

        outArr = this.arr.filter(function(element)
        {
            if (!(startDates.includes(element.dateStart)) || !(endDates.includes(element.dateEnd)))
            {
                startDates.push(element.dateStart);
                endDates.push(element.dateEnd);
                return element;
            }
        });
        outArr.sort(function (a,b)
        {
            return convertToDate(a.dateStart) - convertToDate(b.dateStart);
        });
        return outArr;
    }

    this.getSummary = function(x)
    {
        var outArr = [];

        if (x === undefined)
        {
            let source = this.arr;

            outArr = source.map(function (element)
            {
                if (element.dateStart === element.dateEnd)
                {
                    return ("On " + element.dateStart.toString() + ": " + element.name +
                        " (" + element.description + ")");
                }
                else
                {
                    return ("From " + element.dateStart.toString() + " to " + element.dateEnd.toString() + ": " + element.name +
                        " (" + element.description + ")");
                }
            });
        }
        else if (x.constructor === Array)
        {
            outArr = x.map(function (element3)
            {
                if (element3.dateStart === element3.dateEnd)
                {
                    return ("On " + element3.dateStart.toString() + ": " + element3.name +
                        " (" + element3.description + ")");
                }
                else
                {
                    return ("From " + element3.dateStart.toString() + " to " + element3.dateEnd.toString() + ": " + element3.name +
                        " (" + element3.description + ")");
                }
            });
        }
        else
        {
            var args = Array.prototype.slice.apply(arguments);

            outArr = args.map(function (element2)
            {
                if (element2.dateStart === element2.dateEnd)
                {
                    return ("On " + element2.dateStart.toString() + ": " + element2.name +
                        " (" + element2.description + ")");
                }
                else
                {
                    return ("From " + element2.dateStart.toString() + " to " + element2.dateEnd.toString() + ": " + element2.name +
                        " (" + element2.description + ")");
                }
            });
        }

        return outArr;
    }
}

/* Own function to convert dates in given format to Date Object for comparisons. */
function convertToDate(date)
{
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(9,11);

    if (day.length === 1)
    {
        day = "0" + day;
    }
    return new Date(year + "-" + month + "-" + day);
}

Array.prototype = Object.create(EventHandler.prototype);
Array.prototype.constructor = Array;

Array.prototype.getSummary = function()
{
    let ev = new EventHandler(this);
    return ev.getSummary();
};

Array.prototype.getByMonth = function(x)
{
    let ev = new EventHandler(this);
    return ev.getByMonth(x);
};

Array.prototype.getEventsBetweenDates = function(start, end)
{
    let ev = new EventHandler(this);
    return ev.getEventsBetweenDates(start, end);
};

Array.prototype.getUniqueDateAndSort = function()
{
    let ev = new EventHandler(this);
    return ev.getUniqueDateAndSort();
};





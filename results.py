import matplotlib.pyplot as plt


def main():
    
    results = []
    with open('results.txt', 'r') as file:
        
        lines = file.readlines()
        for line in lines:
            result = line.split('\n')[0]
            results.append(int(result))

    new_results = list(map(remove_last_two_digits, results))
    print(new_results)
    #find smallest and largest element of new_results
    smallest_result = min(new_results)
    largest_result = max(new_results)
    print(smallest_result)
    print(largest_result)
    #step size is 100 because every result is rounded down to nearest hundred
    abs_frequencies = {}
    #initializing all frequencies to 0
    for i in range(smallest_result, largest_result+100, 100):
        abs_frequencies[i] = 0
    #now updating frequencies to their actual counts
    for result in new_results:
        abs_frequencies[result] += 1
    
    percentage_frequencies = {}
    #doing map from scratch
    for key in abs_frequencies:
        percentage_frequencies[key] = abs_frequencies[key] / 100
    print(percentage_frequencies)

    
    # print(len(percentage_frequencies))    
    # plt.figure()
    # plt.xlabel("balance after 1 million trials")
    # plt.ylabel("percentage frequency")
    # plt.xticks(rotation=90)
    # plt.bar(list(percentage_frequencies.keys()), list(percentage_frequencies.values()), width=0.8)
    # plt.show()
    x = [f'Label{i}' for i in range(1, len(percentage_frequencies)+1)]  # 100 bars

    # Increase figure size to fit all bars
    plt.figure(figsize=(20, 10))  # Adjust width and height accordingly
    plt.xlabel("return in tens of thousands")

    # Create bar plot
    plt.bar(x, list(percentage_frequencies.values()))

    # Rotate x-axis labels to make them readable
    plt.xticks(rotation=90)

    plt.show()

def remove_last_two_digits(number):
    return (number // 100) * 100

def map_to_decimal(number):
    return number / 100

if __name__=="__main__":
    main()
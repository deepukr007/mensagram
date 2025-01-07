import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import uuid
import datetime


import os
from supabase import create_client, Client

url: str = "https://qqqtbckmijuirgcbsnxp.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcXRiY2ttaWp1aXJnY2JzbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMjY2MTAsImV4cCI6MjA0MDgwMjYxMH0._d0JdAwxN4sElUhNB3FvC4OX2I1HuTD3qgelVx80ZLs"
supabase: Client = create_client(url, key)


def scrape_menu():
    # URL of the website (replace with the actual URL)
    url = "https://www.swfr.de/en/food/mensa-cafeterias-menus/freiburg/mensa-rempartstrasse"

    # Send a GET request to the URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    for br in soup.select("br"):
        br.replace_with(", ")

    # Find all day tabs
    day_tabs = soup.find_all('div', class_='menu-tagesplan')

    weekly_menu = {}

    for day_tab in day_tabs:
        # Extract day and date
        day_date = day_tab.find('h3').text.strip()
        day_name, date = day_date.split()

        # Find all menu items for the day
        menu_items = day_tab.find_all('div', class_='col-span-1')

        daily_menu = {}

        for item in menu_items:
            # Extract item name and description
            item_name = item.find('h5')
            if item_name is None:
                continue
            item_name = item_name.text.strip()

            item_description = item.find(
                'small', class_='extra-text').text.strip()

            # Add item to daily menu
            if "Tagesgericht" in item_name:
                daily_menu["Tagesgericht"] = item_description
            elif "Schneller Teller" in item_name:
                daily_menu["Schneller Teller"] = item_description
            elif "Essen 1" in item_name:
                daily_menu["Essen 1"] = item_description
            elif "Essen 2" in item_name:
                daily_menu["Essen 2"] = item_description
            elif "Wochenangebot" in item_name:
                daily_menu["Wochenangebot"] = item_description

        # Add daily menu to weekly menu
        weekly_menu[date[0:-1]] = daily_menu

    return weekly_menu


def insert_data(weekly_menu):
    for day, menu in weekly_menu.items():
        md = day.split('.')
        date = datetime.datetime(
            2025, int(md[1]), int(md[0])).strftime('%Y-%m-%d')
        print(f"\n{day}:")
        for item, description in menu.items():
            print(f"  {item}: {description}")
            response = (
                supabase.table("title_imageURL")
                .insert({"title": description, "menu_date": date, "meal_type": item})
                .execute()
            )


if __name__ == "__main__":
    menu = scrape_menu()
    insert_data(menu)
    # for day, menu in menu.items():
    #     print(f"\n{day}:")
    #     for item, description in menu.items():
    #         print(f"  {item}: {description}")

import { DayGroup } from '@/components/ui/DayGroup';
import { Colors } from '@/constants/Colors';
import { useJournalStore } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { eachMonthOfInterval, endOfMonth, format, isSameMonth, startOfMonth } from 'date-fns';
import { useRouter } from 'expo-router';
import { Moon, Search, Sun } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { entries, loadEntries, isLoading } = useJournalStore();
  const { theme, toggleTheme } = useThemeStore();
  const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

  // Dynamic months based on history
  const today = new Date();
  const earliestDate = entries.length > 0
    ? new Date(Math.min(...entries.map(e => new Date(e.date).getTime())))
    : today;

  // Generate months from start to now, then reverse to show latest first
  const months = eachMonthOfInterval({
    start: startOfMonth(earliestDate),
    end: endOfMonth(today)
  }).reverse();

  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  // Ensure selectedMonth is valid if list changes?
  // Usually fine as we default to [0] which is 'today'.
  // But if coming from empty state to loaded?
  // useEffect to reset if needed or just rely on state. To be safe, if selectedMonth is not in months, reset.
  useEffect(() => {
    if (!months.find(m => isSameMonth(m, selectedMonth))) {
      setSelectedMonth(months[0]);
    }
  }, [entries.length, selectedMonth]); // Dependency on entries update

  useEffect(() => {
    loadEntries();
  }, []);

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const matchesMonth = isSameMonth(entryDate, selectedMonth);
    const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = entry.mood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && (matchesSearch || matchesMood);
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedEntries = React.useMemo(() => {
    const groups: Record<string, typeof entries> = {};
    filteredEntries.forEach(entry => {
      const dateKey = format(new Date(entry.date), 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
    });

    return Object.entries(groups)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([dateKey, items]) => ({
        id: dateKey,
        date: new Date(dateKey),
        entries: items
      }));
  }, [filteredEntries]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Mentivo</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5' }]}
            onPress={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={22} color={colors.text} /> : <Moon size={22} color={colors.text} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5' }]}
            onPress={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearchQuery('');
            }}
          >
            <Search size={22} color={showSearch ? colors.primary : colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: colors.text }]}
            placeholder="Search your memories..."
            placeholderTextColor={theme === 'dark' ? '#888' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      )}

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthsScroll}>
          {months.map((date, index) => {
            const label = index === 0 ? 'This month' : format(date, 'MMMM');
            const isActive = isSameMonth(date, selectedMonth);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.monthChip,
                  isActive && { backgroundColor: colors.text, borderColor: colors.text },
                  !isActive && { borderColor: theme === 'dark' ? '#333' : '#eee' }
                ]}
                onPress={() => setSelectedMonth(date)}
              >
                <Text style={[styles.monthText, isActive && { color: theme === 'dark' ? '#000' : '#fff' }]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={groupedEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DayGroup
            date={item.date}
            entries={item.entries}
            onEntryPress={(id) => router.push(`/entry/${id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No entries found.</Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadEntries}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.oceanCalm.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System', // Bold standard font
    color: '#1a1a1a',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    marginBottom: 10,
  },
  monthsScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  monthChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeMonthChip: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeMonthText: {
    color: '#ffffff',
  },
  searchBarContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    fontSize: 16,
    color: '#1a1a1a',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 100, // Space for tab bar
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  }
});

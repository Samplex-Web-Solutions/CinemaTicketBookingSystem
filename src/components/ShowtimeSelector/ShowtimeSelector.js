'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'

export default function ShowtimeSelector({ movieId, onShowtimeSelect }) {
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [showtimes, setShowtimes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDates = async () => {
      // In a real app, fetch available dates from the server
      const today = new Date()
      const nextWeek = Array.from({length: 7}, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        return format(date, 'yyyy-MM-dd')
      })
      setDates(nextWeek)
      setSelectedDate(nextWeek[0])
    }

    fetchDates()
  }, [])

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!selectedDate) return

      setIsLoading(true)
      try {
        const response = await fetch(`/api/showtimes/${movieId}?date=${selectedDate}`)
        if (!response.ok) {
          throw new Error('Failed to fetch showtimes')
        }
        const data = await response.json()
        setShowtimes(data)
        setIsLoading(false)
      } catch (err) {
        setError('Error fetching showtimes. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchShowtimes()
  }, [movieId, selectedDate])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleShowtimeSelect = (showtime) => {
    onShowtimeSelect(showtime)
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Select Showtime</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedDate} onValueChange={handleDateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {dates.map((date) => (
                <SelectItem key={date} value={date}>
                  {format(new Date(date), 'EEEE, MMMM d')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoading ? (
            <div className="text-center">Loading showtimes...</div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {showtimes.map((showtime) => (
                <Button
                  key={showtime.id}
                  variant="outline"
                  onClick={() => handleShowtimeSelect(showtime)}
                >
                  {format(new Date(showtime.datetime), 'h:mm a')}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}